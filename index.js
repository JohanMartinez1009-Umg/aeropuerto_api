require('dotenv').config();
const express = require('express');
const { getConnection, oracledb } = require('./src/config/db');
const { inicializarBaseDatos, eliminarTodasLasTablas } = require('./src/config/database-init');
const sgaRoutes = require('./src/routes/index');

const app = express();
app.use(express.json());

// Middlewares
app.use(express.urlencoded({ extended: true }));

// 1. Ruta de prueba de salud de la API
app.get('/health', (req, res) => {
  res.json({ 
    status: 'API Online', 
    db_service: 'orcl',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 2. Usar todas las rutas del SGA
app.use(sgaRoutes);

// 3. Ruta para listar las tablas del SGA
app.get('/sga/tablas', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    
    // Consultar las tablas del SGA
    const result = await connection.execute(
      `SELECT table_name FROM user_tables 
       WHERE table_name LIKE 'SGA_%' 
       ORDER BY table_name`, 
      [], 
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json({ 
      success: true,
      message: 'Tablas del Sistema de Gestión de Aeropuerto (SGA)', 
      tablas: result.rows.map(row => row.TABLE_NAME),
      total: result.rows.length
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

// 4. Ruta para inicializar la base de datos
app.post('/sga/inicializar', async (req, res) => {
  try {
    const { incluirDatos = true } = req.body || {};
    
    console.log('🚀 Iniciando inicialización de la base de datos SGA...');
    const resultado = await inicializarBaseDatos(incluirDatos);
    
    res.json({
      success: true,
      message: 'Base de datos SGA inicializada correctamente',
      resultado
    });
  } catch (error) {
    console.error('❌ Error en inicialización:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al inicializar la base de datos SGA',
      error: error.message
    });
  }
});

// 5. Ruta para eliminar todas las tablas (solo para desarrollo)
app.delete('/sga/eliminar-todo', async (req, res) => {
  try {
    console.log('🗑️ Eliminando todas las tablas del SGA...');
    await eliminarTodasLasTablas();
    
    res.json({
      success: true,
      message: 'Todas las tablas SGA han sido eliminadas'
    });
  } catch (error) {
    console.error('❌ Error en eliminación:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar las tablas SGA',
      error: error.message
    });
  }
});

// 6. Ruta de prueba de conexión a la base de datos
app.get('/db/test', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    
    const result = await connection.execute(
      `SELECT 
        'SGA Database' as sistema,
        USER as usuario_db,
        TO_CHAR(SYSDATE, 'DD/MM/YYYY HH24:MI:SS') as fecha_hora,
        SYS_CONTEXT('USERENV', 'DB_NAME') as nombre_bd,
        SYS_CONTEXT('USERENV', 'SERVER_HOST') as servidor
       FROM DUAL`
    );
    
    res.json({
      success: true,
      message: 'Conexión a base de datos exitosa',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error de conexión a la base de datos',
      error: error.message
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error cerrando conexión:', err);
      }
    }
  }
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno'
  });
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    endpoint: req.originalUrl,
    availableRoutes: {
      health: 'GET /health',
      documentation: 'GET /sga',
      database: {
        test: 'GET /db/test',
        tables: 'GET /sga/tablas',
        initialize: 'POST /sga/inicializar',
        reset: 'DELETE /sga/eliminar-todo'
      },
      entities: 'GET /sga para ver todas las entidades disponibles'
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  🛩️  ===== SISTEMA DE GESTIÓN DE AEROPUERTO (SGA) =====
  
  🚀 Servidor iniciado en puerto: ${PORT}
  🌍 URL: http://localhost:${PORT}
  📊 Base de datos: Oracle Database
  
  📋 RUTAS PRINCIPALES:
  • GET  /health              - Estado de la API
  • GET  /db/test            - Prueba de conexión DB
  • GET  /sga                - Documentación de entidades
  • GET  /sga/tablas         - Listar tablas SGA
  • POST /sga/inicializar    - Inicializar base de datos
  
  🏗️  ENTIDADES DISPONIBLES:
  Accede a GET /sga para ver todas las entidades y sus endpoints
  
  💡 Ejemplo de uso:
  • GET /sga/vuelo           - Obtener todos los vuelos
  • GET /sga/pasajero/1      - Obtener pasajero con ID 1
  • POST /sga/reserva        - Crear nueva reserva
  
  ===================================================
  `);
});