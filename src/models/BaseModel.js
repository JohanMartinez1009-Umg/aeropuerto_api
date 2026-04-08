const { getConnection } = require('../config/db');

class BaseModel {
  constructor(tableName, primaryKey) {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
  }

  // Obtener todos los registros
  async findAll(options = {}) {
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

  // Obtener un registro por ID
  async findById(id) {
    let connection;
    try {
      connection = await getConnection();
      
      const result = await connection.execute(
        `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = :id`,
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

  // Eliminar un registro
  async delete(id) {
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
      
      return { success: true, message: 'Registro eliminado exitosamente' };
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }

  // Contar registros
  async count(where = {}) {
    let connection;
    try {
      connection = await getConnection();
      
      let sql = `SELECT COUNT(*) as TOTAL FROM ${this.tableName}`;
      let params = [];
      
      if (Object.keys(where).length > 0) {
        const conditions = [];
        const values = [];
        
        Object.entries(where).forEach(([key, value]) => {
          conditions.push(`${key} = :${key}`);
          values.push(value);
        });
        
        sql += ` WHERE ${conditions.join(' AND ')}`;
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
}

module.exports = BaseModel;