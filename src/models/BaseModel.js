const { getConnection } = require('../config/db');

class BaseModel {
  constructor(tableName, primaryKey) {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
  }

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
        outFormat: 1 // OUT_FORMAT_OBJECT
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
        { outFormat: 1 }
      );
      
      return result.rows[0] || null;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Crear un nuevo registro
  async create(data) {
    let connection;
    try {
      connection = await getConnection();
      
      const columns = Object.keys(data);
      const placeholders = columns.map(col => `:${col}`);
      const values = Object.values(data);
      
      const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) 
                   VALUES (${placeholders.join(', ')})`;
      
      await connection.execute(sql, values);
      await connection.commit();
      
      // Obtener el ID del registro creado
      if (data[this.primaryKey]) {
        return await this.findById(data[this.primaryKey]);
      }
      
      return { success: true, message: 'Registro creado exitosamente' };
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Actualizar un registro
  async update(id, data) {
    let connection;
    try {
      connection = await getConnection();
      
      const columns = Object.keys(data);
      const setClause = columns.map(col => `${col} = :${col}`).join(', ');
      const values = [...Object.values(data), id];
      
      const sql = `UPDATE ${this.tableName} 
                   SET ${setClause} 
                   WHERE ${this.primaryKey} = :id`;
      
      const result = await connection.execute(sql, values);
      await connection.commit();
      
      if (result.rowsAffected === 0) {
        throw new Error('Registro no encontrado');
      }
      
      return await this.findById(id);
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Eliminar un registro (borrado lógico)
  async delete(id) {
    let connection;
    try {
      connection = await getConnection();
      
      // Verificar primero que el registro existe y no está eliminado
      const existing = await this.findById(id);
      if (!existing) {
        throw new Error('Registro no encontrado');
      }
      
      const result = await connection.execute(
        `UPDATE ${this.tableName} 
         SET DELETED = 1, FECHA_ELIMINACION = SYSDATE 
         WHERE ${this.primaryKey} = :id AND DELETED = 0`,
        [id]
      );
      await connection.commit();
      
      if (result.rowsAffected === 0) {
        throw new Error('Registro no encontrado o ya fue eliminado');
      }
      
      return { success: true, message: 'Registro eliminado exitosamente (borrado lógico)' };
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
        outFormat: 1
      });
      
      return result.rows[0].TOTAL;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Ejecutar consulta personalizada
  async executeQuery(sql, params = []) {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(sql, params, {
        outFormat: 1
      });
      
      return result.rows;
    } finally {
      if (connection) {
        await connection.close();
      }
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
        outFormat: 1
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
        outFormat: 1
      });
      
      return result.rows;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Restaurar un registro eliminado
  async restore(id) {
    let connection;
    try {
      connection = await getConnection();
      
      // Verificar que el registro existe y está eliminado
      const deleted = await connection.execute(
        `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = :id AND DELETED = 1`,
        [id],
        { outFormat: 1 }
      );
      
      if (deleted.rows.length === 0) {
        throw new Error('Registro no encontrado en elementos eliminados');
      }
      
      const result = await connection.execute(
        `UPDATE ${this.tableName} 
         SET DELETED = 0, FECHA_ELIMINACION = NULL 
         WHERE ${this.primaryKey} = :id AND DELETED = 1`,
        [id]
      );
      await connection.commit();
      
      if (result.rowsAffected === 0) {
        throw new Error('No se pudo restaurar el registro');
      }
      
      return { success: true, message: 'Registro restaurado exitosamente' };
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Eliminar permanentemente un registro (borrado físico)
  async forceDelete(id) {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = :id`,
        [id]
      );
      await connection.commit();
      
      if (result.rowsAffected === 0) {
        throw new Error('Registro no encontrado');
      }
      
      return { success: true, message: 'Registro eliminado permanentemente' };
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
        outFormat: 1
      });
      
      return result.rows[0].TOTAL;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
}

module.exports = BaseModel;