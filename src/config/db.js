const oracledb = require('oracledb');
oracledb.initOracleClient();
// Configuración de conexión
const dbConfig = {
  user          : process.env.DB_USER ,
  password      : process.env.DB_PASSWORD ,
  connectString : process.env.DB_CONNECTION_STRING
  // Formato: host:puerto/nombre_servicio
};

async function query(sql, binds = [], opts = {}) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    // autoCommit: true es útil para INSERTS/UPDATES simples
    const result = await connection.execute(sql, binds, { ...opts, autoCommit: true });
    return result;
  } catch (err) {
    console.error("Error en la DB:", err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error cerrando conexión:", err);
      }
    }
  }
}

async function getConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log("✅ Conexión exitosa a Oracle (Servicio: orcl)");
    return connection;
  } catch (err) {
    console.error("❌ Error de conexión:", err.message);
    throw err;
  }
}

module.exports = { query, getConnection, oracledb };