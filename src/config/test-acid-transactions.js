// ===== PRUEBAS UNITARIAS PARA TRANSACCIONES ACID =====
// Este archivo contiene pruebas para verificar el cumplimiento de las propiedades ACID
// en las operaciones de base de datos del sistema SGA

const { getConnection } = require('./db');
const { ejecutarConTransaccion } = require('./database-init');

// ===== PRUEBAS DE ATOMICIDAD =====

async function pruebaAtomicidad() {
  console.log('\n🧪 PRUEBA DE ATOMICIDAD');
  console.log('═'.repeat(50));
  console.log('Verificando que todas las operaciones se ejecuten o ninguna...\n');

  let connection;
  
  try {
    connection = await getConnection();

    // Prueba 1: Operación exitosa - todas las operaciones deben ejecutarse
    console.log('📋 Prueba 1: Transacción exitosa');
    const operacionExitosa = async (conn) => {
      // Insertar país
      await conn.execute("INSERT INTO SGA_PAIS VALUES (999, 'País Prueba', 'PP')");
      
      // Insertar ciudad dependiente
      await conn.execute("INSERT INTO SGA_CIUDAD VALUES (999, 'Ciudad Prueba', 999)");
      
      return { pais_insertado: true, ciudad_insertada: true };
    };

    const resultado1 = await ejecutarConTransaccion(
      connection, 
      operacionExitosa, 
      'Insertar país y ciudad (exitosa)'
    );

    console.log(`   Resultado: ${resultado1.exito ? '✅ ÉXITO' : '❌ FALLO'}`);
    console.log(`   Transacción: ${resultado1.transaccion}`);

    // Verificar que ambos registros existen
    const verificacion1 = await connection.execute("SELECT COUNT(*) FROM SGA_PAIS WHERE PA_ID_PAIS = 999");
    const verificacion2 = await connection.execute("SELECT COUNT(*) FROM SGA_CIUDAD WHERE CD_ID_CIUDAD = 999");
    
    console.log(`   País insertado: ${verificacion1.rows[0][0] > 0 ? '✅' : '❌'}`);
    console.log(`   Ciudad insertada: ${verificacion2.rows[0][0] > 0 ? '✅' : '❌'}`);

    // Prueba 2: Operación fallida - ninguna operación debe ejecutarse
    console.log('\n📋 Prueba 2: Transacción con error (debe fallar completamente)');
    const operacionFallida = async (conn) => {
      // Insertar país válido
      await conn.execute("INSERT INTO SGA_PAIS VALUES (998, 'País Prueba 2', 'P2')");
      
      // Intentar insertar ciudad con FK inválida (debe fallar)
      await conn.execute("INSERT INTO SGA_CIUDAD VALUES (998, 'Ciudad Inválida', 9999)");
      
      return { operacion_completada: true };
    };

    const resultado2 = await ejecutarConTransaccion(
      connection, 
      operacionFallida, 
      'Insertar país y ciudad inválida (debe fallar)'
    );

    console.log(`   Resultado: ${resultado2.exito ? '❌ NO DEBERÍA PASAR' : '✅ FALLÓ COMO ESPERADO'}`);
    console.log(`   Transacción: ${resultado2.transaccion}`);

    // Verificar que NINGÚN registro se insertó
    const verificacion3 = await connection.execute("SELECT COUNT(*) FROM SGA_PAIS WHERE PA_ID_PAIS = 998");
    const verificacion4 = await connection.execute("SELECT COUNT(*) FROM SGA_CIUDAD WHERE CD_ID_CIUDAD = 998");
    
    console.log(`   País NO insertado: ${verificacion3.rows[0][0] === 0 ? '✅' : '❌'}`);
    console.log(`   Ciudad NO insertada: ${verificacion4.rows[0][0] === 0 ? '✅' : '❌'}`);

    return {
      atomicidad_exitosa: verificacion1.rows[0][0] > 0 && verificacion2.rows[0][0] > 0,
      atomicidad_fallida: verificacion3.rows[0][0] === 0 && verificacion4.rows[0][0] === 0,
      resultado_general: (verificacion1.rows[0][0] > 0 && verificacion2.rows[0][0] > 0) && 
                        (verificacion3.rows[0][0] === 0 && verificacion4.rows[0][0] === 0)
    };

  } finally {
    // Limpiar datos de prueba
    if (connection) {
      try {
        await connection.execute("DELETE FROM SGA_CIUDAD WHERE CD_ID_CIUDAD IN (998, 999)");
        await connection.execute("DELETE FROM SGA_PAIS WHERE PA_ID_PAIS IN (998, 999)");
        await connection.execute("COMMIT");
        await connection.close();
      } catch (error) {
        console.log('Error en limpieza:', error.message);
      }
    }
  }
}

// ===== PRUEBAS DE CONSISTENCIA =====

async function pruebaConsistencia() {
  console.log('\n🧪 PRUEBA DE CONSISTENCIA');
  console.log('═'.repeat(50));
  console.log('Verificando que las restricciones de integridad se mantengan...\n');

  let connection;
  
  try {
    connection = await getConnection();

    // Prueba 1: Intentar violar restricción de FK
    console.log('📋 Prueba 1: Violación de Foreign Key');
    const operacionFK = async (conn) => {
      // Intentar insertar aeropuerto con ciudad inexistente
      await conn.execute("INSERT INTO SGA_AEROPUERTO VALUES (999, 'TEST', 'Aeropuerto Prueba', 99999, 1)");
      return { violacion_fk: true };
    };

    const resultadoFK = await ejecutarConTransaccion(
      connection, 
      operacionFK, 
      'Violación de Foreign Key'
    );

    console.log(`   Resultado: ${resultadoFK.exito ? '❌ NO DEBERÍA PASAR' : '✅ RECHAZADO CORRECTAMENTE'}`);
    console.log(`   Error: ${resultadoFK.error ? resultadoFK.error.substring(0, 80) + '...' : 'N/A'}`);

    // Prueba 2: Intentar violar restricción UNIQUE
    console.log('\n📋 Prueba 2: Violación de restricción UNIQUE');
    
    // Primero insertar un registro válido
    await connection.execute("INSERT INTO SGA_PAIS VALUES (997, 'País Único', 'PU')");
    await connection.execute("COMMIT");

    const operacionUnique = async (conn) => {
      // Intentar insertar otro país con el mismo código (violación UNIQUE)
      await conn.execute("INSERT INTO SGA_PAIS VALUES (996, 'Otro País', 'PU')");
      return { violacion_unique: true };
    };

    const resultadoUnique = await ejecutarConTransaccion(
      connection, 
      operacionUnique, 
      'Violación de restricción UNIQUE'
    );

    console.log(`   Resultado: ${resultadoUnique.exito ? '❌ NO DEBERÍA PASAR' : '✅ RECHAZADO CORRECTAMENTE'}`);
    console.log(`   Error: ${resultadoUnique.error ? resultadoUnique.error.substring(0, 80) + '...' : 'N/A'}`);

    return {
      consistencia_fk: !resultadoFK.exito,
      consistencia_unique: !resultadoUnique.exito,
      resultado_general: !resultadoFK.exito && !resultadoUnique.exito
    };

  } finally {
    // Limpiar datos de prueba
    if (connection) {
      try {
        await connection.execute("DELETE FROM SGA_AEROPUERTO WHERE APT_ID_AEROPUERTO = 999");
        await connection.execute("DELETE FROM SGA_PAIS WHERE PA_ID_PAIS IN (996, 997)");
        await connection.execute("COMMIT");
        await connection.close();
      } catch (error) {
        console.log('Error en limpieza:', error.message);
      }
    }
  }
}

// ===== PRUEBAS DE AISLAMIENTO =====

async function pruebaAislamiento() {
  console.log('\n🧪 PRUEBA DE AISLAMIENTO');
  console.log('═'.repeat(50));
  console.log('Verificando que transacciones concurrentes no interfieran...\n');

  let connection1, connection2;
  
  try {
    connection1 = await getConnection();
    connection2 = await getConnection();

    console.log('📋 Simulando transacciones concurrentes...');
    
    // Transacción 1: Insertar y no hacer commit inmediatamente
    const transaccion1 = async () => {
      await connection1.execute("BEGIN");
      await connection1.execute("INSERT INTO SGA_PAIS VALUES (995, 'País Concurrente 1', 'C1')");
      console.log('   Transacción 1: País insertado (sin commit)');
      
      // Simular trabajo
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await connection1.execute("COMMIT");
      console.log('   Transacción 1: Commit ejecutado');
    };

    // Transacción 2: Intentar leer el registro antes del commit de T1
    const transaccion2 = async () => {
      await new Promise(resolve => setTimeout(resolve, 50)); // Esperar un poco
      
      const resultado = await connection2.execute("SELECT COUNT(*) FROM SGA_PAIS WHERE PA_ID_PAIS = 995");
      console.log(`   Transacción 2: Registros encontrados: ${resultado.rows[0][0]} (debería ser 0 antes del commit)`);
      
      await new Promise(resolve => setTimeout(resolve, 100)); // Esperar más
      
      const resultado2 = await connection2.execute("SELECT COUNT(*) FROM SGA_PAIS WHERE PA_ID_PAIS = 995");
      console.log(`   Transacción 2: Registros encontrados después: ${resultado2.rows[0][0]} (debería ser 1 después del commit)`);
      
      return {
        antes_commit: resultado.rows[0][0],
        despues_commit: resultado2.rows[0][0]
      };
    };

    // Ejecutar transacciones concurrentes
    const [resultado1, resultado2] = await Promise.all([
      transaccion1(),
      transaccion2()
    ]);

    console.log(`   Aislamiento verificado: ${resultado2.antes_commit === 0 && resultado2.despues_commit === 1 ? '✅' : '❌'}`);

    return {
      aislamiento_correcto: resultado2.antes_commit === 0 && resultado2.despues_commit === 1,
      resultado_general: resultado2.antes_commit === 0 && resultado2.despues_commit === 1
    };

  } finally {
    // Limpiar datos de prueba
    if (connection1) {
      try {
        await connection1.execute("DELETE FROM SGA_PAIS WHERE PA_ID_PAIS = 995");
        await connection1.execute("COMMIT");
        await connection1.close();
      } catch (error) {
        console.log('Error en limpieza conexión 1:', error.message);
      }
    }
    if (connection2) {
      try {
        await connection2.close();
      } catch (error) {
        console.log('Error en limpieza conexión 2:', error.message);
      }
    }
  }
}

// ===== PRUEBAS DE DURABILIDAD =====

async function pruebaDurabilidad() {
  console.log('\n🧪 PRUEBA DE DURABILIDAD');
  console.log('═'.repeat(50));
  console.log('Verificando que los datos persistan después del commit...\n');

  let connection;
  
  try {
    connection = await getConnection();

    // Insertar datos con commit explícito
    console.log('📋 Insertando datos con transacción ACID...');
    const operacionDurable = async (conn) => {
      await conn.execute("INSERT INTO SGA_PAIS VALUES (994, 'País Durable', 'PD')");
      await conn.execute("INSERT INTO SGA_CIUDAD VALUES (994, 'Ciudad Durable', 994)");
      return { insertados: 2 };
    };

    const resultado = await ejecutarConTransaccion(
      connection, 
      operacionDurable, 
      'Inserción con durabilidad'
    );

    console.log(`   Transacción completada: ${resultado.exito ? '✅' : '❌'}`);
    console.log(`   Estado: ${resultado.transaccion}`);

    // Cerrar conexión y abrir nueva para verificar persistencia
    await connection.close();
    connection = await getConnection();

    console.log('\n📋 Verificando persistencia con nueva conexión...');
    const verificacionPais = await connection.execute("SELECT COUNT(*) FROM SGA_PAIS WHERE PA_ID_PAIS = 994");
    const verificacionCiudad = await connection.execute("SELECT COUNT(*) FROM SGA_CIUDAD WHERE CD_ID_CIUDAD = 994");

    console.log(`   País persiste: ${verificacionPais.rows[0][0] > 0 ? '✅' : '❌'}`);
    console.log(`   Ciudad persiste: ${verificacionCiudad.rows[0][0] > 0 ? '✅' : '❌'}`);

    return {
      durabilidad_correcta: verificacionPais.rows[0][0] > 0 && verificacionCiudad.rows[0][0] > 0,
      resultado_general: verificacionPais.rows[0][0] > 0 && verificacionCiudad.rows[0][0] > 0
    };

  } finally {
    // Limpiar datos de prueba
    if (connection) {
      try {
        await connection.execute("DELETE FROM SGA_CIUDAD WHERE CD_ID_CIUDAD = 994");
        await connection.execute("DELETE FROM SGA_PAIS WHERE PA_ID_PAIS = 994");
        await connection.execute("COMMIT");
        await connection.close();
      } catch (error) {
        console.log('Error en limpieza:', error.message);
      }
    }
  }
}

// ===== FUNCIÓN PRINCIPAL DE PRUEBAS =====

async function ejecutarTodasLasPruebas() {
  console.log('🧪 INICIANDO SUITE DE PRUEBAS ACID PARA SGA');
  console.log('═'.repeat(70));
  
  const inicioTiempo = Date.now();
  const resultados = {};

  try {
    // Ejecutar todas las pruebas
    resultados.atomicidad = await pruebaAtomicidad();
    resultados.consistencia = await pruebaConsistencia();
    resultados.aislamiento = await pruebaAislamiento();
    resultados.durabilidad = await pruebaDurabilidad();

    // Generar resumen final
    const tiempoTotal = Date.now() - inicioTiempo;
    
    console.log('\n🏆 RESUMEN DE PRUEBAS ACID');
    console.log('═'.repeat(70));
    console.log(`🔸 Atomicidad: ${resultados.atomicidad.resultado_general ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`🔸 Consistencia: ${resultados.consistencia.resultado_general ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`🔸 Aislamiento: ${resultados.aislamiento.resultado_general ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`🔸 Durabilidad: ${resultados.durabilidad.resultado_general ? '✅ PASS' : '❌ FAIL'}`);

    const todasPasaron = Object.values(resultados).every(r => r.resultado_general);
    
    console.log(`\n${todasPasaron ? '🎉' : '⚠️'} ACID COMPLIANCE: ${todasPasaron ? 'COMPLETO' : 'PARCIAL'}`);
    console.log(`⏱️  Tiempo total: ${(tiempoTotal / 1000).toFixed(2)}s`);
    console.log('═'.repeat(70));

    return {
      ...resultados,
      resumen: {
        todas_pasaron: todasPasaron,
        tiempo_total_ms: tiempoTotal,
        acid_compliance: todasPasaron ? 'COMPLETO' : 'PARCIAL'
      }
    };

  } catch (error) {
    console.error('💥 Error en suite de pruebas:', error.message);
    throw error;
  }
}

// Exportar funciones
module.exports = {
  pruebaAtomicidad,
  pruebaConsistencia, 
  pruebaAislamiento,
  pruebaDurabilidad,
  ejecutarTodasLasPruebas
};

// Ejecutar si se ejecuta directamente
if (require.main === module) {
  ejecutarTodasLasPruebas()
    .then(resultados => {
      console.log('\n✅ Suite de pruebas completada');
      process.exit(resultados.resumen.todas_pasaron ? 0 : 1);
    })
    .catch(error => {
      console.error('❌ Suite de pruebas falló:', error.message);
      process.exit(1);
    });
}