const BaseModel = require('./BaseModel');

// ===== MODELOS ENTIDADES PRINCIPALES =====
class AeropuertoModel extends BaseModel {
  constructor() {
    super('SGA_AEROPUERTO', 'APT_ID_AEROPUERTO');
  }

  // Obtener aeropuertos con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT a.*, c.CD_NOMBRE, p.PA_NOMBRE, ea.EAP_DESCRIPCION 
      FROM SGA_AEROPUERTO a
      JOIN SGA_CIUDAD c ON a.APT_ID_CIUDAD = c.CD_ID_CIUDAD
      JOIN SGA_PAIS p ON c.PA_ID_PAIS = p.PA_ID_PAIS
      JOIN SGA_ESTADO_AEROPUERTO ea ON a.EAP_ID_ESTADO_AEROPUERTO = ea.EAP_ID_ESTADO_AEROPUERTO
      ORDER BY a.APT_NOMBRE
    `);
  }
}

class AerolineaModel extends BaseModel {
  constructor() {
    super('SGA_AEROLINEA', 'ARL_ID_AEROLINEA');
  }

  // Obtener aerolíneas con estado
  async findAllWithStatus() {
    return await this.executeQuery(`
      SELECT a.*, ea.EAL_DESCRIPCION 
      FROM SGA_AEROLINEA a
      JOIN SGA_ESTADO_AEROLINEA ea ON a.EAL_ID_ESTADO_AEROLINEA = ea.EAL_ID_ESTADO_AEROLINEA
      ORDER BY a.ARL_NOMBRE
    `);
  }
}

class ModeloAvionModel extends BaseModel {
  constructor() {
    super('SGA_MODELO_AVION', 'MDA_ID_MODELO');
  }
}

class AvionModel extends BaseModel {
  constructor() {
    super('SGA_AVION', 'AVN_ID_AVION');
  }

  // Obtener aviones con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT a.*, m.MDA_NOMBRE_MODELO, m.MDA_CAPACIDAD_PASAJEROS, ea.EAV_DESCRIPCION 
      FROM SGA_AVION a
      JOIN SGA_MODELO_AVION m ON a.MDA_ID_MODELO = m.MDA_ID_MODELO
      JOIN SGA_ESTADO_AVION ea ON a.EAV_ID_ESTADO_AVION = ea.EAV_ID_ESTADO_AVION
      ORDER BY a.AVN_MATRICULA
    `);
  }

  // Obtener aviones disponibles
  async findAvailable() {
    return await this.executeQuery(`
      SELECT a.*, m.MDA_NOMBRE_MODELO, m.MDA_CAPACIDAD_PASAJEROS 
      FROM SGA_AVION a
      JOIN SGA_MODELO_AVION m ON a.MDA_ID_MODELO = m.MDA_ID_MODELO
      JOIN SGA_ESTADO_AVION ea ON a.EAV_ID_ESTADO_AVION = ea.EAV_ID_ESTADO_AVION
      WHERE ea.EAV_DESCRIPCION = 'OPERATIVO'
      ORDER BY a.AVN_MATRICULA
    `);
  }
}

class ProgramaVueloModel extends BaseModel {
  constructor() {
    super('SGA_PROGRAMA_VUELO', 'PRV_ID_PROGRAMA');
  }

  // Obtener programas con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT p.*, 
             arl.ARL_NOMBRE, arl.ARL_CODIGO_IATA,
             ao.APT_NOMBRE AS AEROPUERTO_ORIGEN, ao.APT_CODIGO AS CODIGO_ORIGEN,
             ad.APT_NOMBRE AS AEROPUERTO_DESTINO, ad.APT_CODIGO AS CODIGO_DESTINO,
             tv.TV_DESCRIPCION
      FROM SGA_PROGRAMA_VUELO p
      JOIN SGA_AEROLINEA arl ON p.ARL_ID_AEROLINEA = arl.ARL_ID_AEROLINEA
      JOIN SGA_AEROPUERTO ao ON p.ID_AEROPUERTO_ORIGEN = ao.APT_ID_AEROPUERTO
      JOIN SGA_AEROPUERTO ad ON p.ID_AEROPUERTO_DESTINO = ad.APT_ID_AEROPUERTO
      JOIN SGA_TIPO_VUELO tv ON p.ID_TIPO_VUELO = tv.ID_TIPO_VUELO
      ORDER BY p.PRV_NUMERO_VUELO
    `);
  }
}

class DíaProgramaVueloModel extends BaseModel {
  constructor() {
    super('SGA_DIA_PROGRAMA_VUELO', 'DPV_ID_DIA_PROGRAMA');
  }
}

class VueloModel extends BaseModel {
  constructor() {
    super('SGA_VUELO', 'VL_ID_VUELO');
  }

  // Obtener vuelos con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT v.*, 
             p.PRV_NUMERO_VUELO,
             arl.ARL_NOMBRE, arl.ARL_CODIGO_IATA,
             ao.APT_NOMBRE AS AEROPUERTO_ORIGEN, ao.APT_CODIGO AS CODIGO_ORIGEN,
             ad.APT_NOMBRE AS AEROPUERTO_DESTINO, ad.APT_CODIGO AS CODIGO_DESTINO,
             a.AVN_MATRICULA,
             m.MDA_NOMBRE_MODELO,
             ev.ESV_DESCRIPCION
      FROM SGA_VUELO v
      JOIN SGA_PROGRAMA_VUELO p ON v.PRV_ID_PROGRAMA = p.PRV_ID_PROGRAMA
      JOIN SGA_AEROLINEA arl ON p.ARL_ID_AEROLINEA = arl.ARL_ID_AEROLINEA
      JOIN SGA_AEROPUERTO ao ON p.ID_AEROPUERTO_ORIGEN = ao.APT_ID_AEROPUERTO
      JOIN SGA_AEROPUERTO ad ON p.ID_AEROPUERTO_DESTINO = ad.APT_ID_AEROPUERTO
      JOIN SGA_AVION a ON v.AVN_ID_AVION = a.AVN_ID_AVION
      JOIN SGA_MODELO_AVION m ON a.MDA_ID_MODELO = m.MDA_ID_MODELO
      JOIN SGA_ESTADO_VUELO ev ON v.ESV_ID_ESTADO_VUELO = ev.ESV_ID_ESTADO_VUELO
      ORDER BY v.VL_FECHA DESC, p.PRV_NUMERO_VUELO
    `);
  }

  // Obtener vuelos por fecha
  async findByDate(fecha) {
    return await this.executeQuery(`
      SELECT v.*, 
             p.PRV_NUMERO_VUELO,
             arl.ARL_NOMBRE,
             ao.APT_NOMBRE AS AEROPUERTO_ORIGEN,
             ad.APT_NOMBRE AS AEROPUERTO_DESTINO,
             ev.ESV_DESCRIPCION
      FROM SGA_VUELO v
      JOIN SGA_PROGRAMA_VUELO p ON v.PRV_ID_PROGRAMA = p.PRV_ID_PROGRAMA
      JOIN SGA_AEROLINEA arl ON p.ARL_ID_AEROLINEA = arl.ARL_ID_AEROLINEA
      JOIN SGA_AEROPUERTO ao ON p.ID_AEROPUERTO_ORIGEN = ao.APT_ID_AEROPUERTO
      JOIN SGA_AEROPUERTO ad ON p.ID_AEROPUERTO_DESTINO = ad.APT_ID_AEROPUERTO
      JOIN SGA_ESTADO_VUELO ev ON v.ESV_ID_ESTADO_VUELO = ev.ESV_ID_ESTADO_VUELO
      WHERE TRUNC(v.VL_FECHA) = TRUNC(TO_DATE(:fecha, 'YYYY-MM-DD'))
      ORDER BY v.VL_FECHA, p.PRV_NUMERO_VUELO
    `, [fecha]);
  }
}

class EscalaTecnicaModel extends BaseModel {
  constructor() {
    super('SGA_ESCALA_TECNICA', 'ET_ID_ESCALA');
  }
}

class PasajeroModel extends BaseModel {
  constructor() {
    super('SGA_PASAJERO', 'PAS_ID_PASAJERO');
  }

  // Obtener pasajeros con información del país
  async findAllWithCountry() {
    return await this.executeQuery(`
      SELECT p.*, pa.PA_NOMBRE, pa.PA_CODIGO 
      FROM SGA_PASAJERO p
      JOIN SGA_PAIS pa ON p.PA_ID_PAIS = pa.PA_ID_PAIS
      ORDER BY p.PAS_PRIMER_APELLIDO, p.PAS_PRIMER_NOMBRE
    `);
  }

  // Buscar pasajero por pasaporte
  async findByPassport(pasaporte) {
    return await this.executeQuery(`
      SELECT p.*, pa.PA_NOMBRE 
      FROM SGA_PASAJERO p
      JOIN SGA_PAIS pa ON p.PA_ID_PAIS = pa.PA_ID_PAIS
      WHERE p.PAS_PASAPORTE = :pasaporte
    `, [pasaporte]);
  }
}

class PuertaEmbarqueModel extends BaseModel {
  constructor() {
    super('SGA_PUERTA_EMBARQUE', 'PTE_ID_PUERTA');
  }

  // Obtener puertas con información del aeropuerto y terminal
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT p.*, a.APT_NOMBRE, a.APT_CODIGO, t.TRM_NOMBRE 
      FROM SGA_PUERTA_EMBARQUE p
      JOIN SGA_AEROPUERTO a ON p.APT_ID_AEROPUERTO = a.APT_ID_AEROPUERTO
      JOIN SGA_TERMINAL t ON p.TRM_ID_TERMINAL = t.TRM_ID_TERMINAL
      ORDER BY a.APT_NOMBRE, t.TRM_NOMBRE, p.PTE_NUMERO_PUERTA
    `);
  }
}

class EmpleadoModel extends BaseModel {
  constructor() {
    super('SGA_EMPLEADO', 'EMP_ID_EMPLEADO');
  }

  // Obtener empleados con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT e.*, 
             p.PTS_NOMBRE,
             d.DEP_NOMBRE,
             ee.ESE_DESCRIPCION,
             a.APT_NOMBRE
      FROM SGA_EMPLEADO e
      JOIN SGA_PUESTO p ON e.PTS_ID_PUESTO = p.PTS_ID_PUESTO
      JOIN SGA_DEPARTAMENTO d ON e.DEP_ID = d.DEP_ID
      JOIN SGA_ESTADO_EMPLEADO ee ON e.ESE_ID_ESTADO_EMPLEADO = ee.ESE_ID_ESTADO_EMPLEADO
      JOIN SGA_AEROPUERTO a ON e.APT_ID_AEROPUERTO = a.APT_ID_AEROPUERTO
      ORDER BY e.EMP_PRIMER_APELLIDO, e.EMP_PRIMER_NOMBRE
    `);
  }
}

module.exports = {
  AeropuertoModel,
  AerolineaModel,
  ModeloAvionModel,
  AvionModel,
  ProgramaVueloModel,
  DíaProgramaVueloModel,
  VueloModel,
  EscalaTecnicaModel,
  PasajeroModel,
  PuertaEmbarqueModel,
  EmpleadoModel
};