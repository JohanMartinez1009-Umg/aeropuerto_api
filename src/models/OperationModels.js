const BaseModel = require('./BaseModel');

// ===== MODELOS ENTIDADES DE OPERACIÓN =====
class ReservaModel extends BaseModel {
  constructor() {
    super('SGA_RESERVA', 'REV_ID_RESERVA');
  }

  // Obtener reservas con información del pasajero y estado
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT r.*, 
             p.PAS_PRIMER_NOMBRE, p.PAS_PRIMER_APELLIDO, p.PAS_PASAPORTE,
             er.ESR_DESCRIPCION
      FROM SGA_RESERVA r
      JOIN SGA_PASAJERO p ON r.PAS_ID_PASAJERO = p.PAS_ID_PASAJERO
      JOIN SGA_ESTADO_RESERVA er ON r.ESR_ID = er.ESR_ID
      ORDER BY r.REV_FECHA DESC
    `);
  }

  // Obtener reservas por pasajero
  async findByPassenger(pasajeroId) {
    return await this.executeQuery(`
      SELECT r.*, er.ESR_DESCRIPCION
      FROM SGA_RESERVA r
      JOIN SGA_ESTADO_RESERVA er ON r.ESR_ID = er.ESR_ID
      WHERE r.PAS_ID_PASAJERO = :pasajeroId
      ORDER BY r.REV_FECHA DESC
    `, [pasajeroId]);
  }
}

class DetalleModel extends BaseModel {
  constructor() {
    super('SGA_DETALLE', 'DTR_ID_DETALLE');
  }

  // Obtener detalles con información de vuelos
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT d.*, 
             v.VL_FECHA,
             p.PRV_NUMERO_VUELO,
             ao.APT_CODIGO AS CODIGO_ORIGEN,
             ad.APT_CODIGO AS CODIGO_DESTINO
      FROM SGA_DETALLE d
      JOIN SGA_VUELO v ON d.VL_ID_VUELO = v.VL_ID_VUELO
      JOIN SGA_PROGRAMA_VUELO p ON v.PRV_ID_PROGRAMA = p.PRV_ID_PROGRAMA
      JOIN SGA_AEROPUERTO ao ON p.ID_AEROPUERTO_ORIGEN = ao.APT_ID_AEROPUERTO
      JOIN SGA_AEROPUERTO ad ON p.ID_AEROPUERTO_DESTINO = ad.APT_ID_AEROPUERTO
      ORDER BY v.VL_FECHA DESC
    `);
  }
}

class BoletoModel extends BaseModel {
  constructor() {
    super('SGA_BOLETO', 'BLT_ID_BOLETO');
  }

  // Obtener boletos con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT b.*, 
             cb.CLB_DESCRIPCION,
             p.PAS_PRIMER_NOMBRE, p.PAS_PRIMER_APELLIDO
      FROM SGA_BOLETO b
      JOIN SGA_RESERVA r ON b.REV_ID_RESERVA = r.REV_ID_RESERVA
      JOIN SGA_PASAJERO p ON r.PAS_ID_PASAJERO = p.PAS_ID_PASAJERO
      JOIN SGA_CLASE_BOLETO cb ON b.CLB_ID_CLASE_BOLETO = cb.CLB_ID_CLASE_BOLETO
      ORDER BY b.BLT_ID_BOLETO DESC
    `);
  }
}

class EquipajeModel extends BaseModel {
  constructor() {
    super('SGA_EQUIPAJE', 'EQP_EQUIPAJE');
  }

  // Obtener equipajes con información del boleto
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT e.*, 
             te.TEQ_DESCRIPCION,
             b.BLT_ID_BOLETO,
             p.PAS_PRIMER_NOMBRE, p.PAS_PRIMER_APELLIDO
      FROM SGA_EQUIPAJE e
      JOIN SGA_BOLETO b ON e.BLT_ID_BOLETO = b.BLT_ID_BOLETO
      JOIN SGA_RESERVA r ON b.REV_ID_RESERVA = r.REV_ID_RESERVA
      JOIN SGA_PASAJERO p ON r.PAS_ID_PASAJERO = p.PAS_ID_PASAJERO
      JOIN SGA_TIPO_EQUIPAJE te ON e.TEQ_ID = te.TEQ_ID
      ORDER BY e.EQP_EQUIPAJE DESC
    `);
  }
}

class AsignacionPuertaModel extends BaseModel {
  constructor() {
    super('SGA_ASIGNACION_PUERTA', 'ASP_ID_ASIGNACION');
  }

  // Obtener asignaciones con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT ap.*, 
             v.VL_FECHA,
             p.PRV_NUMERO_VUELO,
             pe.PTE_NUMERO_PUERTA,
             t.TRM_NOMBRE,
             a.APT_NOMBRE,
             ea.EAS_DESCRIPCION
      FROM SGA_ASIGNACION_PUERTA ap
      JOIN SGA_VUELO v ON ap.VL_ID_VUELO = v.VL_ID_VUELO
      JOIN SGA_PROGRAMA_VUELO p ON v.PRV_ID_PROGRAMA = p.PRV_ID_PROGRAMA
      JOIN SGA_PUERTA_EMBARQUE pe ON ap.PTE_ID_PUERTA = pe.PTE_ID_PUERTA
      JOIN SGA_TERMINAL t ON pe.TRM_ID_TERMINAL = t.TRM_ID_TERMINAL
      JOIN SGA_AEROPUERTO a ON pe.APT_ID_AEROPUERTO = a.APT_ID_AEROPUERTO
      JOIN SGA_ESTADO_ASIGNACION ea ON ap.EAS_ID_ESTADO_ASIGNACION = ea.EAS_ID_ESTADO_ASIGNACION
      ORDER BY ap.ASP_FECHA DESC, ap.ASP_HORA_INICIO DESC
    `);
  }
}

class HistorialVueloModel extends BaseModel {
  constructor() {
    super('SGA_HISTORIAL_VUELO', 'HVL_ID_HISTORIAL');
  }

  // Obtener historial con información del vuelo
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT h.*, 
             v.VL_FECHA,
             p.PRV_NUMERO_VUELO,
             te.TE_DESCRIPCION,
             ev1.ESV_DESCRIPCION AS ESTADO_PREVIO_DESC,
             ev2.ESV_DESCRIPCION AS ESTADO_ACTUAL_DESC
      FROM SGA_HISTORIAL_VUELO h
      JOIN SGA_VUELO v ON h.VL_ID_VUELO = v.VL_ID_VUELO
      JOIN SGA_PROGRAMA_VUELO p ON v.PRV_ID_PROGRAMA = p.PRV_ID_PROGRAMA
      JOIN SGA_TIPO_EVENTO te ON h.TE_ID = te.TE_ID
      LEFT JOIN SGA_ESTADO_VUELO ev1 ON h.ESV_ESTADO_PREVIO = ev1.ESV_ID_ESTADO_VUELO
      LEFT JOIN SGA_ESTADO_VUELO ev2 ON h.ESV_ESTADO_ACTUAL = ev2.ESV_ID_ESTADO_VUELO
      ORDER BY h.HVL_FECHA_CAMBIO DESC
    `);
  }

  // Obtener historial por vuelo
  async findByFlight(vueloId) {
    return await this.executeQuery(`
      SELECT h.*, 
             te.TE_DESCRIPCION,
             ev1.ESV_DESCRIPCION AS ESTADO_PREVIO_DESC,
             ev2.ESV_DESCRIPCION AS ESTADO_ACTUAL_DESC
      FROM SGA_HISTORIAL_VUELO h
      JOIN SGA_TIPO_EVENTO te ON h.TE_ID = te.TE_ID
      LEFT JOIN SGA_ESTADO_VUELO ev1 ON h.ESV_ESTADO_PREVIO = ev1.ESV_ID_ESTADO_VUELO
      LEFT JOIN SGA_ESTADO_VUELO ev2 ON h.ESV_ESTADO_ACTUAL = ev2.ESV_ID_ESTADO_VUELO
      WHERE h.VL_ID_VUELO = :vueloId
      ORDER BY h.HVL_FECHA_CAMBIO DESC
    `, [vueloId]);
  }
}

class ObjetoPerdidoModel extends BaseModel {
  constructor() {
    super('SGA_OBJETO_PERDIDO', 'OBP_ID_OBJETO');
  }

  // Obtener objetos perdidos con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT op.*, 
             tu.TUB_DESCRIPCION,
             eo.EOB_DESCRIPCION,
             arl.ARL_NOMBRE,
             v.VL_FECHA,
             p.PRV_NUMERO_VUELO
      FROM SGA_OBJETO_PERDIDO op
      JOIN SGA_TIPO_UBICACION tu ON op.TUB_ID = tu.TUB_ID
      JOIN SGA_ESTADO_OBJETO eo ON op.EOB_ID_ESTADO_OBJETO = eo.EOB_ID_ESTADO_OBJETO
      JOIN SGA_AEROLINEA arl ON op.ARL_ID_AEROLINEA = arl.ARL_ID_AEROLINEA
      LEFT JOIN SGA_VUELO v ON op.VL_ID_VUELO = v.VL_ID_VUELO
      LEFT JOIN SGA_PROGRAMA_VUELO p ON v.PRV_ID_PROGRAMA = p.PRV_ID_PROGRAMA
      ORDER BY op.OBP_FECHA_REPORTE DESC
    `);
  }
}

class ArrestoModel extends BaseModel {
  constructor() {
    super('SGA_ARRESTO', 'ARS_ID_ARRESTO');
  }

  // Obtener arrestos con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT ar.*, 
             p.PAS_PRIMER_NOMBRE, p.PAS_PRIMER_APELLIDO, p.PAS_PASAPORTE,
             a.APT_NOMBRE,
             m.MOT_DESCRIPCION,
             v.VL_FECHA,
             pr.PRV_NUMERO_VUELO
      FROM SGA_ARRESTO ar
      JOIN SGA_PASAJERO p ON ar.PAS_ID_PASAJERO = p.PAS_ID_PASAJERO
      JOIN SGA_AEROPUERTO a ON ar.APT_ID_AEROPUERTO = a.APT_ID_AEROPUERTO
      JOIN SGA_MOTIVO m ON ar.MOT_ID_MOTIVO = m.MOT_ID_MOTIVO
      LEFT JOIN SGA_VUELO v ON ar.VL_ID_VUELO = v.VL_ID_VUELO
      LEFT JOIN SGA_PROGRAMA_VUELO pr ON v.PRV_ID_PROGRAMA = pr.PRV_ID_PROGRAMA
      ORDER BY ar.ARS_FECHA DESC
    `);
  }
}

module.exports = {
  ReservaModel,
  DetalleModel,
  BoletoModel,
  EquipajeModel,
  AsignacionPuertaModel,
  HistorialVueloModel,
  ObjetoPerdidoModel,
  ArrestoModel
};