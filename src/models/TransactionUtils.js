// ===== UTILIDADES ACID PARA MODELOS =====
// Este archivo proporciona funciones utilitarias para el manejo de transacciones ACID
// que pueden ser utilizadas por todos los modelos del sistema SGA

const { getConnection } = require('../config/db');

/**
 * Clase utilitaria para el manejo de transacciones ACID
 */
class TransactionUtils {
  
  /**
   * Ejecuta una operación dentro de una transacción ACID con manejo completo de errores
   * @param {Function} operacion - Función que ejecuta las operaciones de BD
   * @param {string} descripcion - Descripción de la operación para logging
   * @param {Object} connection - Conexión opcional (si no se proporciona, crea una nueva)
   * @returns {Object} Resultado de la operación con información de la transacción
   */
  static async ejecutarTransaccion(operacion, descripcion = 'Operación de base de datos', connection = null) {
    let conexionPropia = !connection;
    let conn = connection;
    
    try {
      // Crear conexión si no se proporciona
      if (!conn) {
        conn = await getConnection();
      }

      console.log(`🚀 Iniciando transacción ACID: ${descripcion}`);
      
      // Ejecutar la operación (la transacción inicia automáticamente con autoCommit=false)
      const resultado = await operacion(conn);
      
      // Confirmar transacción
      await conn.commit();
      console.log(`✅ COMMIT ejecutado - ${descripcion}`);
      
      return { 
        exito: true, 
        datos: resultado,
        transaccion: 'COMMITTED',
        descripcion,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      // Rollback en caso de error
      try {
        if (conn) {
          await conn.rollback();
          console.log(`❌ ROLLBACK ejecutado - ${descripcion}: ${error.message}`);
        }
      } catch (rollbackError) {
        console.error(`💥 Error en ROLLBACK - ${descripcion}: ${rollbackError.message}`);
      }
      
      return { 
        exito: false, 
        error: error.message,
        transaccion: 'ROLLED_BACK',
        descripcion,
        timestamp: new Date().toISOString()
      };
      
    } finally {
      // Cerrar conexión solo si fue creada por nosotros
      if (conexionPropia && conn) {
        try {
          await conn.close();
        } catch (closeError) {
          console.error(`Error cerrando conexión: ${closeError.message}`);
        }
      }
    }
  }

  /**
   * Ejecuta múltiples operaciones en una sola transacción ACID
   * @param {Array} operaciones - Array de objetos {operacion: Function, descripcion: string}
   * @param {string} descripcionGeneral - Descripción general de la transacción
   * @returns {Object} Resultado consolidado de todas las operaciones
   */
  static async ejecutarTransaccionMultiple(operaciones, descripcionGeneral = 'Transacción múltiple') {
    let connection;
    
    try {
      connection = await getConnection();
      console.log(`🚀 Iniciando transacción múltiple ACID: ${descripcionGeneral}`);
      
      // La transacción inicia automáticamente con autoCommit=false
      const resultados = [];
      
      // Ejecutar cada operación secuencialmente
      for (let i = 0; i < operaciones.length; i++) {
        const { operacion, descripcion } = operaciones[i];
        console.log(`🔄 Ejecutando paso ${i + 1}/${operaciones.length}: ${descripcion}`);
        
        try {
          const resultado = await operacion(connection);
          resultados.push({
            paso: i + 1,
            descripcion,
            exito: true,
            datos: resultado
          });
          
          console.log(`   ✅ Paso ${i + 1} completado exitosamente`);
        } catch (error) {
          // Si cualquier paso falla, fallar toda la transacción
          console.log(`   ❌ Paso ${i + 1} falló: ${error.message}`);
          throw error;
        }
      }
      
      // Confirmar transacción
      await connection.commit();
      console.log(`✅ COMMIT ejecutado - ${descripcionGeneral} (${operaciones.length} operaciones)`);
      
      return {
        exito: true,
        descripcion: descripcionGeneral,
        operaciones_ejecutadas: operaciones.length,
        resultados,
        transaccion: 'COMMITTED',
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      // Rollback en caso de error
      try {
        if (connection) {
          await connection.rollback();
          console.log(`❌ ROLLBACK ejecutado - ${descripcionGeneral}: ${error.message}`);
        }
      } catch (rollbackError) {
        console.error(`💥 Error en ROLLBACK - ${descripcionGeneral}: ${rollbackError.message}`);
      }
      
      return {
        exito: false,
        descripcion: descripcionGeneral,
        error: error.message,
        transaccion: 'ROLLED_BACK',
        timestamp: new Date().toISOString()
      };
      
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (closeError) {
          console.error(`Error cerrando conexión: ${closeError.message}`);
        }
      }
    }
  }

  /**
   * Valida datos antes de ejecutar operaciones de BD
   * @param {Object} datos - Datos a validar
   * @param {Object} reglas - Reglas de validación
   * @returns {Object} Resultado de la validación
   */
  static validarDatos(datos, reglas) {
    const errores = [];
    
    for (const campo in reglas) {
      const regla = reglas[campo];
      const valor = datos[campo];
      
      // Verificar campo requerido
      if (regla.requerido && (valor === undefined || valor === null || valor === '')) {
        errores.push(`El campo ${campo} es requerido`);
        continue;
      }
      
      // Verificar tipo de dato
      if (valor !== undefined && valor !== null && regla.tipo) {
        const tipoActual = typeof valor;
        if (tipoActual !== regla.tipo) {
          errores.push(`El campo ${campo} debe ser de tipo ${regla.tipo}, recibido: ${tipoActual}`);
        }
      }
      
      // Verificar longitud mínima
      if (valor && regla.minLength && valor.toString().length < regla.minLength) {
        errores.push(`El campo ${campo} debe tener al menos ${regla.minLength} caracteres`);
      }
      
      // Verificar longitud máxima
      if (valor && regla.maxLength && valor.toString().length > regla.maxLength) {
        errores.push(`El campo ${campo} no puede tener más de ${regla.maxLength} caracteres`);
      }
      
      // Verificar expresión regular
      if (valor && regla.pattern && !regla.pattern.test(valor)) {
        errores.push(`El campo ${campo} no tiene el formato correcto`);
      }
    }
    
    return {
      valido: errores.length === 0,
      errores
    };
  }

  /**
   * Ejecuta una operación de borrado lógico con transacción ACID
   * @param {string} tabla - Nombre de la tabla
   * @param {string} campoId - Nombre del campo ID
   * @param {number} id - ID del registro a eliminar
   * @param {Object} connection - Conexión opcional
   * @returns {Object} Resultado de la operación
   */
  static async borradoLogico(tabla, campoId, id, connection = null) {
    const operacion = async (conn) => {
      // Verificar que el registro existe y no está eliminado
      const verificacion = await conn.execute(
        `SELECT COUNT(*) as EXISTE FROM ${tabla} WHERE ${campoId} = :id AND DELETED = 0`,
        [id]
      );
      
      if (verificacion.rows[0][0] === 0) {
        throw new Error('Registro no encontrado o ya eliminado');
      }
      
      // Ejecutar borrado lógico
      const resultado = await conn.execute(
        `UPDATE ${tabla} SET DELETED = 1, FECHA_ELIMINACION = SYSDATE WHERE ${campoId} = :id AND DELETED = 0`,
        [id]
      );
      
      return {
        tabla,
        id,
        registros_afectados: resultado.rowsAffected,
        fecha_eliminacion: new Date().toISOString()
      };
    };

    return await this.ejecutarTransaccion(
      operacion, 
      `Borrado lógico en ${tabla} (ID: ${id})`, 
      connection
    );
  }

  /**
   * Ejecuta una operación de restauración con transacción ACID
   * @param {string} tabla - Nombre de la tabla
   * @param {string} campoId - Nombre del campo ID
   * @param {number} id - ID del registro a restaurar
   * @param {Object} connection - Conexión opcional
   * @returns {Object} Resultado de la operación
   */
  static async restaurarRegistro(tabla, campoId, id, connection = null) {
    const operacion = async (conn) => {
      // Verificar que el registro existe y está eliminado
      const verificacion = await conn.execute(
        `SELECT COUNT(*) as EXISTE FROM ${tabla} WHERE ${campoId} = :id AND DELETED = 1`,
        [id]
      );
      
      if (verificacion.rows[0][0] === 0) {
        throw new Error('Registro no encontrado o no está eliminado');
      }
      
      // Ejecutar restauración
      const resultado = await conn.execute(
        `UPDATE ${tabla} SET DELETED = 0, FECHA_ELIMINACION = NULL WHERE ${campoId} = :id AND DELETED = 1`,
        [id]
      );
      
      return {
        tabla,
        id,
        registros_afectados: resultado.rowsAffected,
        fecha_restauracion: new Date().toISOString()
      };
    };

    return await this.ejecutarTransaccion(
      operacion, 
      `Restauración en ${tabla} (ID: ${id})`, 
      connection
    );
  }

  /**
   * Genera estadísticas de una transacción
   * @param {Object} resultadoTransaccion - Resultado de la transacción
   * @returns {Object} Estadísticas formateadas
   */
  static generarEstadisticas(resultadoTransaccion) {
    return {
      exito: resultadoTransaccion.exito,
      estado_transaccion: resultadoTransaccion.transaccion,
      descripcion: resultadoTransaccion.descripcion,
      timestamp: resultadoTransaccion.timestamp,
      duracion_estimada: 'N/A', // Se puede implementar con timestamps más precisos
      acid_compliance: resultadoTransaccion.transaccion === 'COMMITTED' ? 'COMPLETO' : 'FALLIDO'
    };
  }
}

module.exports = TransactionUtils;