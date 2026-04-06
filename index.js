require('dotenv').config();
const express = require('express');
const { getConnection, oracledb } = require('./src/config/db');
const { inicializarBaseDatos, eliminarTodasLasTablas } = require('./src/config/database-init');

const app = express();
app.use(express.json());

// 1. Ruta de prueba de salud de la API
app.get('/health', (req, res) => {
  res.json({ status: 'API Online', db_service: 'orcl' });
});

// 2. Ruta para listar las tablas del SGA
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
      mensaje: 'Tablas del Sistema de Gestión de Aeropuerto (SGA):', 
      tablas: result.rows.map(row => row.TABLE_NAME),
      total: result.rows.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// 3. Ruta para obtener vuelos SGA (con información completa)
app.get('/sga/vuelos', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    
    // Consulta compleja con múltiples JOINs para información completa
    const result = await connection.execute(
      `SELECT 
        v.VL_ID_VUELO,
        pv.PRV_NUMERO_VUELO AS NUMERO_VUELO,
        origen.APT_CODIGO || ' - ' || origen.APT_NOMBRE AS AEROPUERTO_ORIGEN,
        destino.APT_CODIGO || ' - ' || destino.APT_NOMBRE AS AEROPUERTO_DESTINO,
        av.AVN_MATRICULA || ' (' || ma.MDA_NOMBRE_MODELO || ')' AS AVION,
        al.ARL_NOMBRE AS AEROLINEA,
        v.VL_FECHA AS FECHA_VUELO,
        v.VL_PLAZAS_VACIAS,
        ev.ESV_DESCRIPCION AS ESTADO,
        tv.TV_DESCRIPCION AS TIPO_VUELO
       FROM SGA_VUELO v
       JOIN SGA_PROGRAMA_VUELO pv ON v.PRV_ID_PROGRAMA = pv.PRV_ID_PROGRAMA
       JOIN SGA_AEROPUERTO origen ON pv.ID_AEROPUERTO_ORIGEN = origen.APT_ID_AEROPUERTO
       JOIN SGA_AEROPUERTO destino ON pv.ID_AEROPUERTO_DESTINO = destino.APT_ID_AEROPUERTO  
       JOIN SGA_AVION av ON v.AVN_ID_AVION = av.AVN_ID_AVION
       JOIN SGA_MODELO_AVION ma ON av.MDA_ID_MODELO = ma.MDA_ID_MODELO
       JOIN SGA_AEROLINEA al ON pv.ARL_ID_AEROLINEA = al.ARL_ID_AEROLINEA
       JOIN SGA_ESTADO_VUELO ev ON v.ESV_ID_ESTADO_VUELO = ev.ESV_ID_ESTADO_VUELO
       JOIN SGA_TIPO_VUELO tv ON pv.ID_TIPO_VUELO = tv.ID_TIPO_VUELO
       ORDER BY v.VL_FECHA`, 
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// 4. 🚀 SISTEMA DE INICIALIZACIÓN SGA (Sistema de Gestión de Aeropuerto) 🚀
app.post('/inicializar-sga', async (req, res) => {
  try {
    console.log('🚀 Iniciando creación completa del Sistema SGA...');
    
    const incluirDatos = req.query.datos !== 'false'; // Por defecto incluye datos
    const resultado = await inicializarBaseDatos(incluirDatos);
    
    res.json({
      mensaje: '🎉 Sistema de Gestión de Aeropuerto (SGA) inicializado exitosamente',
      resultado: resultado,
      endpoints_disponibles: {
        aeropuertos: '/sga/aeropuertos',
        aerolineas: '/sga/aerolineas', 
        aviones: '/sga/aviones',
        vuelos: '/sga/vuelos',
        pasajeros: '/sga/pasajeros',
        reservas: '/sga/reservas',
        catalogo_completo: '/sga/catalogos'
      }
    });
    
  } catch (error) {
    res.status(500).json({ 
      error: 'Error inicializando Sistema SGA',
      detalle: error.message 
    });
  }
});

// 5. 🗑️ Eliminar todas las tablas SGA (solo para desarrollo)
app.delete('/reset-sga', async (req, res) => {  
  try {
    await eliminarTodasLasTablas();
    res.json({ 
      mensaje: '🗑️ Todas las tablas del SGA han sido eliminadas',
      nota: 'Usa POST /inicializar-sga para recrearlas'
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error eliminando tablas SGA',
      detalle: error.message 
    });
  }
});

// 6. 📊 Consultas a las tablas SGA
app.get('/sga/aeropuertos', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      `SELECT 
        a.APT_ID_AEROPUERTO,
        a.APT_CODIGO,
        a.APT_NOMBRE,
        c.CD_NOMBRE AS CIUDAD,
        p.PA_NOMBRE AS PAIS,
        e.EAP_DESCRIPCION AS ESTADO
       FROM SGA_AEROPUERTO a
       JOIN SGA_CIUDAD c ON a.APT_ID_CIUDAD = c.CD_ID_CIUDAD
       JOIN SGA_PAIS p ON c.PA_ID_PAIS = p.PA_ID_PAIS
       JOIN SGA_ESTADO_AEROPUERTO e ON a.EAP_ID_ESTADO_AEROPUERTO = e.EAP_ID_ESTADO_AEROPUERTO
       ORDER BY a.APT_NOMBRE`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.get('/sga/aerolineas', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      `SELECT 
        a.ARL_ID_AEROLINEA,
        a.ARL_NOMBRE,
        a.ARL_CODIGO_IATA,
        e.EAL_DESCRIPCION AS ESTADO
       FROM SGA_AEROLINEA a
       JOIN SGA_ESTADO_AEROLINEA e ON a.EAL_ID_ESTADO_AEROLINEA = e.EAL_ID_ESTADO_AEROLINEA
       ORDER BY a.ARL_NOMBRE`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.get('/sga/aviones', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      `SELECT 
        av.AVN_ID_AVION,
        av.AVN_MATRICULA,
        m.MDA_NOMBRE_MODELO AS MODELO,
        m.MDA_CAPACIDAD_PASAJEROS AS CAPACIDAD,
        es.EAV_DESCRIPCION AS ESTADO
       FROM SGA_AVION av
       JOIN SGA_MODELO_AVION m ON av.MDA_ID_MODELO = m.MDA_ID_MODELO
       JOIN SGA_ESTADO_AVION es ON av.EAV_ID_ESTADO_AVION = es.EAV_ID_ESTADO_AVION
       ORDER BY av.AVN_MATRICULA`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.get('/sga/catalogos', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    
    // Obtener todos los catálogos
    const catalogos = {};
    
    const tablasCatalogo = [
      { tabla: 'SGA_PAIS', campos: 'PA_ID_PAIS as ID, PA_NOMBRE as NOMBRE, PA_CODIGO as CODIGO' },
      { tabla: 'SGA_ESTADO_AEROPUERTO', campos: 'EAP_ID_ESTADO_AEROPUERTO as ID, EAP_DESCRIPCION as DESCRIPCION' },
      { tabla: 'SGA_ESTADO_AEROLINEA', campos: 'EAL_ID_ESTADO_AEROLINEA as ID, EAL_DESCRIPCION as DESCRIPCION' },
      { tabla: 'SGA_ESTADO_VUELO', campos: 'ESV_ID_ESTADO_VUELO as ID, ESV_DESCRIPCION as DESCRIPCION' },
      { tabla: 'SGA_TIPO_VUELO', campos: 'ID_TIPO_VUELO as ID, TV_DESCRIPCION as DESCRIPCION' },
      { tabla: 'SGA_DIA', campos: 'DIA_ID_DIA as ID, DIA_NOMBRE as NOMBRE' },
      { tabla: 'SGA_CLASE_BOLETO', campos: 'CLB_ID_CLASE_BOLETO as ID, CLB_DESCRIPCION as DESCRIPCION' }
    ];
    
    for (const cat of tablasCatalogo) {
      const result = await connection.execute(
        `SELECT ${cat.campos} FROM ${cat.tabla} ORDER BY 1`,
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      catalogos[cat.tabla] = result.rows;
    }
    
    res.json({
      mensaje: 'Catálogos del Sistema SGA',
      catalogos: catalogos
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor volando en http://localhost:${PORT}`);
});