const { getConnection } = require('../config/db');
const TransactionUtils = require('./TransactionUtils');

class BaseModel {
  constructor(tableName, primaryKey) {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
  }

  // ===== MÉTODOS DE CONSULTA (SOLO LECTURA) =====

  // Obtener todos los registros (solo activos por defecto)
  async findAll(options = {}) {
    let connection;
    try {
      connection = await getConnection();
      
      let sql = `SELECT * FROM ${this.tableName}`;
      let params = [];
      
      // Agregar filtro de borrado lógico por defecto
      const conditions = ['DELETED = 0'];
      
      // Agregar condiciones WHERE si existen
      if (options.where) {
        const values = [];
        
        Object.entries(options.where).forEach(([key, value]) => {
          conditions.push(`${key} = :${key}`);
          values.push(value);
        });
        
        params = values;
      }
      
      sql += ` WHERE ${conditions.join(' AND ')}`;
      
      // Agregar ORDER BY
      if (options.orderBy) {
        sql += ` ORDER BY ${options.orderBy}`;
      }
      
      // Agregar LIMIT
      if (options.limit) {
        sql += ` FETCH FIRST ${options.limit} ROWS ONLY`;
      }
      
      const result = await connection.execute(sql, params, {
        outFormat: 4002 // OUT_FORMAT_OBJECT
      });
      
      return result.rows;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Obtener un registro por ID (solo activos)
  async findById(id) {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = :id AND DELETED = 0`,
        [id],
        { outFormat: 4002 }
      );
      
      return result.rows[0] || null;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Contar registros (solo activos)
  async count(where = {}) {
    let connection;
    try {
      connection = await getConnection();
      
      let sql = `SELECT COUNT(*) as TOTAL FROM ${this.tableName}`;
      let params = [];
      
      // Agregar filtro de borrado lógico
      const conditions = ['DELETED = 0'];
      
      if (Object.keys(where).length > 0) {
        const values = [];
        
        Object.entries(where).forEach(([key, value]) => {
          conditions.push(`${key} = :${key}`);
          values.push(value);
        });
        
        params = values;
      }
      
      sql += ` WHERE ${conditions.join(' AND ')}`;
      
      const result = await connection.execute(sql, params, {
        outFormat: 4002
      });
      
      return result.rows[0].TOTAL;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // ===== MÉTODOS DE MODIFICACIÓN CON TRANSACCIONES ACID =====

  // Crear un nuevo registro con transacciones ACID
  async create(data) {
    const operacion = async (connection) => {
      const columns = Object.keys(data);
      const placeholders = columns.map(col => `:${col}`);
      const values = Object.values(data);
      
      const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) 
                   VALUES (${placeholders.join(', ')})`;
      
      const result = await connection.execute(sql, values);
      
      // Verificar que la inserción fue exitosa
      if (result.rowsAffected === 0) {
        throw new Error('No se pudo crear el registro');
      }
      
      return {
        rowsAffected: result.rowsAffected,
        createdId: data[this.primaryKey] || null
      };
    };

    const resultado = await TransactionUtils.ejecutarTransaccion(
      operacion, 
      `CREATE en ${this.tableName}`
    );

    if (resultado.exito) {
      console.log(`🚀 CREATE EXITOSO: ${this.tableName} - Transacción: ${resultado.transaccion}`);
      
      // Obtener el registro creado si es posible
      if (resultado.datos.createdId) {
        return await this.findById(resultado.datos.createdId);
      }
      
      return { 
        success: true, 
        message: 'Registro creado exitosamente',
        transaccion: resultado.transaccion,
        timestamp: resultado.timestamp
      };
    } else {
      console.log(`❌ CREATE FALLIDO: ${this.tableName} - ${resultado.error}`);
      throw new Error(`Error en CREATE: ${resultado.error}`);
    }
  }

  // Actualizar un registro con transacciones ACID
  async update(id, data) {
    const operacion = async (connection) => {
      // Verificar que el registro existe y está activo antes de actualizar
      const existing = await connection.execute(
        `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = :id AND DELETED = 0`,
        [id],
        { outFormat: 4002 }
      );
      
      if (existing.rows.length === 0) {
        throw new Error('Registro no encontrado o está eliminado');
      }
      
      const columns = Object.keys(data);
      const setClause = columns.map(col => `${col} = :${col}`).join(', ');
      const values = [...Object.values(data), id];
      
      const sql = `UPDATE ${this.tableName} 
                   SET ${setClause} 
                   WHERE ${this.primaryKey} = :id AND DELETED = 0`;
      
      const result = await connection.execute(sql, values);
      
      // Verificar que la actualización fue exitosa
      if (result.rowsAffected === 0) {
        throw new Error('No se pudo actualizar el registro');
      }
      
      return {
        rowsAffected: result.rowsAffected,
        updatedId: id,
        originalData: existing.rows[0]
      };
    };

    const resultado = await TransactionUtils.ejecutarTransaccion(
      operacion, 
      `UPDATE en ${this.tableName} (ID: ${id})`
    );

    if (resultado.exito) {
      console.log(`✅ UPDATE EXITOSO: ${this.tableName} ID:${id} - Transacción: ${resultado.transaccion}`);
      return await this.findById(id);
    } else {
      console.log(`❌ UPDATE FALLIDO: ${this.tableName} ID:${id} - ${resultado.error}`);
      throw new Error(`Error en UPDATE: ${resultado.error}`);
    }
  }

  // Eliminar un registro (borrado lógico) con transacciones ACID
  async delete(id) {
    const resultado = await TransactionUtils.borradoLogico(
      this.tableName, 
      this.primaryKey, 
      id
    );

    if (resultado.exito) {
      console.log(`🗑️ DELETE EXITOSO: ${this.tableName} ID:${id} - Transacción: ${resultado.transaccion}`);
      return { 
        success: true, 
        message: 'Registro eliminado exitosamente (borrado lógico)',
        transaccion: resultado.transaccion,
        timestamp: resultado.timestamp
      };
    } else {
      console.log(`❌ DELETE FALLIDO: ${this.tableName} ID:${id} - ${resultado.error}`);
      throw new Error(`Error en DELETE: ${resultado.error}`);
    }
  }

  // Restaurar un registro eliminado con transacciones ACID
  async restore(id) {
    const resultado = await TransactionUtils.restaurarRegistro(
      this.tableName, 
      this.primaryKey, 
      id
    );

    if (resultado.exito) {
      console.log(`♻️ RESTORE EXITOSO: ${this.tableName} ID:${id} - Transacción: ${resultado.transaccion}`);
      return { 
        success: true, 
        message: 'Registro restaurado exitosamente',
        transaccion: resultado.transaccion,
        timestamp: resultado.timestamp
      };
    } else {
      console.log(`❌ RESTORE FALLIDO: ${this.tableName} ID:${id} - ${resultado.error}`);
      throw new Error(`Error en RESTORE: ${resultado.error}`);
    }
  }

  // Eliminar permanentemente un registro (borrado físico) con transacciones ACID
  async forceDelete(id) {
    const operacion = async (connection) => {
      // Verificar que el registro existe antes de eliminarlo
      const existing = await connection.execute(
        `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = :id`,
        [id],
        { outFormat: 4002 }
      );
      
      if (existing.rows.length === 0) {
        throw new Error('Registro no encontrado');
      }
      
      const result = await connection.execute(
        `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = :id`,
        [id]
      );
      
      // Verificar que la eliminación fue exitosa
      if (result.rowsAffected === 0) {
        throw new Error('No se pudo eliminar el registro permanentemente');
      }
      
      return {
        rowsAffected: result.rowsAffected,
        deletedData: existing.rows[0]
      };
    };

    const resultado = await TransactionUtils.ejecutarTransaccion(
      operacion, 
      `FORCE DELETE en ${this.tableName} (ID: ${id})`
    );

    if (resultado.exito) {
      console.log(`⚠️ FORCE DELETE EXITOSO: ${this.tableName} ID:${id} - Transacción: ${resultado.transaccion}`);
      return { 
        success: true, 
        message: 'Registro eliminado permanentemente',
        transaccion: resultado.transaccion,
        timestamp: resultado.timestamp
      };
    } else {
      console.log(`❌ FORCE DELETE FALLIDO: ${this.tableName} ID:${id} - ${resultado.error}`);
      throw new Error(`Error en FORCE DELETE: ${resultado.error}`);
    }
  }

  // ===== MÉTODOS PARA BORRADO LÓGICO =====

  // Obtener todos los registros incluyendo eliminados
  async findAllIncludingDeleted(options = {}) {
    let connection;
    try {
      connection = await getConnection();
      
      let sql = `SELECT * FROM ${this.tableName}`;
      let params = [];
      
      // Agregar condiciones WHERE si existen
      if (options.where) {
        const conditions = [];
        const values = [];
        
        Object.entries(options.where).forEach(([key, value]) => {
          conditions.push(`${key} = :${key}`);
          values.push(value);
        });
        
        sql += ` WHERE ${conditions.join(' AND ')}`;
        params = values;
      }
      
      // Agregar ORDER BY
      if (options.orderBy) {
        sql += ` ORDER BY ${options.orderBy}`;
      }
      
      const result = await connection.execute(sql, params, {
        outFormat: 4002
      });
      
      return result.rows;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Obtener solo registros eliminados
  async findDeleted(options = {}) {
    let connection;
    try {
      connection = await getConnection();
      
      let sql = `SELECT * FROM ${this.tableName} WHERE DELETED = 1`;
      let params = [];
      
      // Agregar condiciones WHERE adicionales si existen
      if (options.where) {
        const conditions = [];
        const values = [];
        
        Object.entries(options.where).forEach(([key, value]) => {
          conditions.push(`${key} = :${key}`);
          values.push(value);
        });
        
        if (conditions.length > 0) {
          sql += ` AND ${conditions.join(' AND ')}`;
          params = values;
        }
      }
      
      // Agregar ORDER BY
      if (options.orderBy) {
        sql += ` ORDER BY ${options.orderBy}`;
      } else {
        sql += ` ORDER BY FECHA_ELIMINACION DESC`;
      }
      
      const result = await connection.execute(sql, params, {
        outFormat: 4002
      });
      
      return result.rows;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Contar registros eliminados
  async countDeleted(where = {}) {
    let connection;
    try {
      connection = await getConnection();
      
      let sql = `SELECT COUNT(*) as TOTAL FROM ${this.tableName} WHERE DELETED = 1`;
      let params = [];
      
      if (Object.keys(where).length > 0) {
        const conditions = [];
        const values = [];
        
        Object.entries(where).forEach(([key, value]) => {
          conditions.push(`${key} = :${key}`);
          values.push(value);
        });
        
        sql += ` AND ${conditions.join(' AND ')}`;
        params = values;
      }
      
      const result = await connection.execute(sql, params, {
        outFormat: 4002
      });
      
      return result.rows[0].TOTAL;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // ===== MÉTODOS AVANZADOS CON TRANSACCIONES ACID =====

  // Crear múltiples registros en una sola transacción
  async createBatch(dataArray) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      throw new Error('Se requiere un array no vacío de datos para crear en lote');
    }

    const operaciones = dataArray.map((data, index) => ({
      operacion: async (connection) => {
        const columns = Object.keys(data);
        const placeholders = columns.map(col => `:${col}`);
        const values = Object.values(data);
        
        const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) 
                     VALUES (${placeholders.join(', ')})`;
        
        const result = await connection.execute(sql, values);
        
        if (result.rowsAffected === 0) {
          throw new Error(`No se pudo crear el registro ${index + 1}`);
        }
        
        return {
          index: index + 1,
          rowsAffected: result.rowsAffected,
          data: data
        };
      },
      descripcion: `Insertar registro ${index + 1} en ${this.tableName}`
    }));

    const resultado = await TransactionUtils.ejecutarTransaccionMultiple(
      operaciones,
      `CREATE BATCH en ${this.tableName} (${dataArray.length} registros)`
    );

    if (resultado.exito) {
      console.log(`🚀 CREATE BATCH EXITOSO: ${this.tableName} - ${dataArray.length} registros`);
      return {
        success: true,
        message: `${dataArray.length} registros creados exitosamente en lote`,
        registros_creados: dataArray.length,
        transaccion: resultado.transaccion,
        timestamp: resultado.timestamp
      };
    } else {
      console.log(`❌ CREATE BATCH FALLIDO: ${this.tableName} - ${resultado.error}`);
      throw new Error(`Error en CREATE BATCH: ${resultado.error}`);
    }
  }

  // Actualizar múltiples registros en una sola transacción
  async updateBatch(updates) {
    if (!Array.isArray(updates) || updates.length === 0) {
      throw new Error('Se requiere un array no vacío de actualizaciones');
    }

    const operaciones = updates.map((update, index) => ({
      operacion: async (connection) => {
        const { id, data } = update;
        
        // Verificar que el registro existe
        const existing = await connection.execute(
          `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = :id AND DELETED = 0`,
          [id],
          { outFormat: 4002 }
        );
        
        if (existing.rows.length === 0) {
          throw new Error(`Registro con ID ${id} no encontrado o está eliminado`);
        }
        
        const columns = Object.keys(data);
        const setClause = columns.map(col => `${col} = :${col}`).join(', ');
        const values = [...Object.values(data), id];
        
        const sql = `UPDATE ${this.tableName} 
                     SET ${setClause} 
                     WHERE ${this.primaryKey} = :id AND DELETED = 0`;
        
        const result = await connection.execute(sql, values);
        
        if (result.rowsAffected === 0) {
          throw new Error(`No se pudo actualizar el registro ${index + 1} (ID: ${id})`);
        }
        
        return {
          index: index + 1,
          id: id,
          rowsAffected: result.rowsAffected,
          originalData: existing.rows[0]
        };
      },
      descripcion: `Actualizar registro ${index + 1} en ${this.tableName} (ID: ${update.id})`
    }));

    const resultado = await TransactionUtils.ejecutarTransaccionMultiple(
      operaciones,
      `UPDATE BATCH en ${this.tableName} (${updates.length} registros)`
    );

    if (resultado.exito) {
      console.log(`✅ UPDATE BATCH EXITOSO: ${this.tableName} - ${updates.length} registros`);
      return {
        success: true,
        message: `${updates.length} registros actualizados exitosamente en lote`,
        registros_actualizados: updates.length,
        transaccion: resultado.transaccion,
        timestamp: resultado.timestamp
      };
    } else {
      console.log(`❌ UPDATE BATCH FALLIDO: ${this.tableName} - ${resultado.error}`);
      throw new Error(`Error en UPDATE BATCH: ${resultado.error}`);
    }
  }

  // Ejecutar consulta personalizada con transacción ACID opcional
  async executeQuery(sql, params = [], useTransaction = false) {
    if (useTransaction) {
      const operacion = async (connection) => {
        const result = await connection.execute(sql, params, {
          outFormat: 4002
        });
        
        return result.rows;
      };

      const resultado = await TransactionUtils.ejecutarTransaccion(
        operacion,
        `Query personalizada en ${this.tableName}`
      );

      if (resultado.exito) {
        return resultado.datos;
      } else {
        throw new Error(`Error en query personalizada: ${resultado.error}`);
      }
    } else {
      // Ejecución sin transacción para consultas de solo lectura
      let connection;
      try {
        connection = await getConnection();
        
        const result = await connection.execute(sql, params, {
          outFormat: 4002
        });
        
        return result.rows;
      } finally {
        if (connection) {
          await connection.close();
        }
      }
    }
  }

  // ===== MÉTODOS DE VALIDACIÓN Y UTILIDADES =====

  // Validar datos antes de operaciones
  validateData(data, rules) {
    return TransactionUtils.validarDatos(data, rules);
  }

  // Obtener estadísticas de la tabla
  async getTableStats() {
    let connection;
    try {
      connection = await getConnection();
      
      const stats = await connection.execute(`
        SELECT 
          COUNT(*) as TOTAL_REGISTROS,
          SUM(CASE WHEN DELETED = 0 THEN 1 ELSE 0 END) as REGISTROS_ACTIVOS,
          SUM(CASE WHEN DELETED = 1 THEN 1 ELSE 0 END) as REGISTROS_ELIMINADOS
        FROM ${this.tableName}
      `, [], { outFormat: 4002 });
      
      return {
        tabla: this.tableName,
        total_registros: stats.rows[0].TOTAL_REGISTROS,
        registros_activos: stats.rows[0].REGISTROS_ACTIVOS,
        registros_eliminados: stats.rows[0].REGISTROS_ELIMINADOS,
        porcentaje_activos: stats.rows[0].TOTAL_REGISTROS > 0 
          ? ((stats.rows[0].REGISTROS_ACTIVOS / stats.rows[0].TOTAL_REGISTROS) * 100).toFixed(2)
          : 0,
        timestamp: new Date().toISOString()
      };
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
}

module.exports = BaseModel;