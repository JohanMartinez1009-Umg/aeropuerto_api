const BaseModel = require('./BaseModel');

// ===== MODELOS ENTIDADES NUEVAS =====
class AsignacionEmpleadoModel extends BaseModel {
  constructor() {
    super('SGA_ASIGNACION_EMPLEADO', 'ASE_ID');
  }

  // Obtener asignaciones con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT ae.*, 
             e.EMP_PRIMER_NOMBRE, e.EMP_PRIMER_APELLIDO,
             pu.PTS_NOMBRE,
             t.TRN_NOMBRE,
             v.VL_FECHA,
             pr.PRV_NUMERO_VUELO,
             pe.PTE_NUMERO_PUERTA
      FROM SGA_ASIGNACION_EMPLEADO ae
      JOIN SGA_EMPLEADO e ON ae.EMP_ID_EMPLEADO = e.EMP_ID_EMPLEADO
      JOIN SGA_PUESTO pu ON e.PTS_ID_PUESTO = pu.PTS_ID_PUESTO
      JOIN SGA_TURNO t ON ae.TRN_ID = t.TRN_ID
      LEFT JOIN SGA_VUELO v ON ae.VL_ID_VUELO = v.VL_ID_VUELO
      LEFT JOIN SGA_PROGRAMA_VUELO pr ON v.PRV_ID_PROGRAMA = pr.PRV_ID_PROGRAMA
      LEFT JOIN SGA_PUERTA_EMBARQUE pe ON ae.PTE_ID_PUERTA = pe.PTE_ID_PUERTA
      ORDER BY ae.ASE_FECHA DESC
    `);
  }
}

class PagoModel extends BaseModel {
  constructor() {
    super('SGA_PAGO', 'PAG_ID');
  }

  // Obtener pagos con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT pa.*, 
             mp.MPG_NOMBRE,
             p.PAS_PRIMER_NOMBRE, p.PAS_PRIMER_APELLIDO,
             er.ESR_DESCRIPCION
      FROM SGA_PAGO pa
      JOIN SGA_METODO_PAGO mp ON pa.MPG_ID = mp.MPG_ID
      JOIN SGA_RESERVA r ON pa.REV_ID_RESERVA = r.REV_ID_RESERVA
      JOIN SGA_PASAJERO p ON r.PAS_ID_PASAJERO = p.PAS_ID_PASAJERO
      JOIN SGA_ESTADO_RESERVA er ON r.ESR_ID = er.ESR_ID
      ORDER BY pa.PAG_FECHA DESC
    `);
  }
}

class ReembolsoModel extends BaseModel {
  constructor() {
    super('SGA_REEMBOLSO', 'REM_ID');
  }

  // Obtener reembolsos con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT re.*, 
             er.ESR_NOMBRE,
             pa.PAG_MONTO AS MONTO_ORIGINAL,
             mp.MPG_NOMBRE,
             p.PAS_PRIMER_NOMBRE, p.PAS_PRIMER_APELLIDO
      FROM SGA_REEMBOLSO re
      JOIN SGA_ESTADO_REEMBOLSO er ON re.ESR_ID = er.ESR_ID
      JOIN SGA_PAGO pa ON re.PAG_ID = pa.PAG_ID
      JOIN SGA_METODO_PAGO mp ON pa.MPG_ID = mp.MPG_ID
      JOIN SGA_RESERVA r ON pa.REV_ID_RESERVA = r.REV_ID_RESERVA
      JOIN SGA_PASAJERO p ON r.PAS_ID_PASAJERO = p.PAS_ID_PASAJERO
      ORDER BY re.REM_FECHA DESC
    `);
  }
}

class PasajeroVueloModel extends BaseModel {
  constructor() {
    super('SGA_PASAJERO_VUELO', 'ID_PASAJERO_VUELO');
  }

  // Obtener pasajeros de vuelos con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT pv.*, 
             p.PAS_PRIMER_NOMBRE, p.PAS_PRIMER_APELLIDO, p.PAS_PASAPORTE,
             v.VL_FECHA,
             pr.PRV_NUMERO_VUELO,
             ea.EAB_NOMBRE
      FROM SGA_PASAJERO_VUELO pv
      JOIN SGA_PASAJERO p ON pv.PAS_ID_PASAJERO = p.PAS_ID_PASAJERO
      JOIN SGA_VUELO v ON pv.VL_ID_VUELO = v.VL_ID_VUELO
      JOIN SGA_PROGRAMA_VUELO pr ON v.PRV_ID_PROGRAMA = pr.PRV_ID_PROGRAMA
      JOIN SGA_ESTADO_ABORDAJE ea ON pv.EAB_ID_ESTADO_ABORDAJE = ea.EAB_ID_ESTADO_ABORDAJE
      ORDER BY v.VL_FECHA DESC, pr.PRV_NUMERO_VUELO
    `);
  }

  // Obtener pasajeros por vuelo
  async findByFlight(vueloId) {
    return await this.executeQuery(`
      SELECT pv.*, 
             p.PAS_PRIMER_NOMBRE, p.PAS_PRIMER_APELLIDO, p.PAS_PASAPORTE,
             ea.EAB_NOMBRE
      FROM SGA_PASAJERO_VUELO pv
      JOIN SGA_PASAJERO p ON pv.PAS_ID_PASAJERO = p.PAS_ID_PASAJERO
      JOIN SGA_ESTADO_ABORDAJE ea ON pv.EAB_ID_ESTADO_ABORDAJE = ea.EAB_ID_ESTADO_ABORDAJE
      WHERE pv.VL_ID_VUELO = :vueloId
      ORDER BY p.PAS_PRIMER_APELLIDO, p.PAS_PRIMER_NOMBRE
    `, [vueloId]);
  }
}

class CheckinModel extends BaseModel {
  constructor() {
    super('SGA_CHECKIN', 'CHK_ID');
  }

  // Obtener check-ins con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT c.*, 
             p.PAS_PRIMER_NOMBRE, p.PAS_PRIMER_APELLIDO, p.PAS_PASAPORTE,
             v.VL_FECHA,
             pr.PRV_NUMERO_VUELO,
             ec.ECK_NOMBRE
      FROM SGA_CHECKIN c
      JOIN SGA_PASAJERO p ON c.PAS_ID_PASAJERO = p.PAS_ID_PASAJERO
      JOIN SGA_VUELO v ON c.VL_ID_VUELO = v.VL_ID_VUELO
      JOIN SGA_PROGRAMA_VUELO pr ON v.PRV_ID_PROGRAMA = pr.PRV_ID_PROGRAMA
      JOIN SGA_ESTADO_CHECKIN ec ON c.ECK_ID_ESTADO = ec.ECK_ID_ESTADO
      ORDER BY c.CHK_FECHA_CHECKIN DESC
    `);
  }
}

class AsientoModel extends BaseModel {
  constructor() {
    super('SGA_ASIENTO', 'ASI_ID_ASIENTO');
  }

  // Obtener asientos con información del avión
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT a.*, 
             av.AVN_MATRICULA,
             ma.MDA_NOMBRE_MODELO,
             cb.CLB_DESCRIPCION
      FROM SGA_ASIENTO a
      JOIN SGA_AVION av ON a.AVN_ID_AVION = av.AVN_ID_AVION
      JOIN SGA_MODELO_AVION ma ON av.MDA_ID_MODELO = ma.MDA_ID_MODELO
      JOIN SGA_CLASE_BOLETO cb ON a.CLB_ID_CLASE_BOLETO = cb.CLB_ID_CLASE_BOLETO
      ORDER BY av.AVN_MATRICULA, a.ASI_NUMERO
    `);
  }

  // Obtener asientos por avión
  async findByAircraft(avionId) {
    return await this.executeQuery(`
      SELECT a.*, cb.CLB_DESCRIPCION
      FROM SGA_ASIENTO a
      JOIN SGA_CLASE_BOLETO cb ON a.CLB_ID_CLASE_BOLETO = cb.CLB_ID_CLASE_BOLETO
      WHERE a.AVN_ID_AVION = :avionId
      ORDER BY a.ASI_NUMERO
    `, [avionId]);
  }
}

class AsignacionAsientoModel extends BaseModel {
  constructor() {
    super('SGA_ASIGNACION_ASIENTO', 'ASA_ID_ASIGNACION');
  }

  // Obtener asignaciones de asientos con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT aa.*, 
             b.BLT_ID_BOLETO,
             a.ASI_NUMERO,
             av.AVN_MATRICULA,
             v.VL_FECHA,
             pr.PRV_NUMERO_VUELO,
             p.PAS_PRIMER_NOMBRE, p.PAS_PRIMER_APELLIDO,
             ea.EAS_NOMBRE
      FROM SGA_ASIGNACION_ASIENTO aa
      JOIN SGA_BOLETO b ON aa.BLT_ID_BOLETO = b.BLT_ID_BOLETO
      JOIN SGA_ASIENTO a ON aa.ASI_ID_ASIENTO = a.ASI_ID_ASIENTO
      JOIN SGA_AVION av ON a.AVN_ID_AVION = av.AVN_ID_AVION
      JOIN SGA_VUELO v ON aa.VL_ID_VUELO = v.VL_ID_VUELO
      JOIN SGA_PROGRAMA_VUELO pr ON v.PRV_ID_PROGRAMA = pr.PRV_ID_PROGRAMA
      JOIN SGA_RESERVA r ON b.REV_ID_RESERVA = r.REV_ID_RESERVA
      JOIN SGA_PASAJERO p ON r.PAS_ID_PASAJERO = p.PAS_ID_PASAJERO
      JOIN SGA_ESTADO_ASIENTO ea ON aa.EAS_ID_ESTADO = ea.EAS_ID_ESTADO
      ORDER BY v.VL_FECHA DESC, pr.PRV_NUMERO_VUELO, a.ASI_NUMERO
    `);
  }
}

class UsuarioModel extends BaseModel {
  constructor() {
    super('SGA_USUARIO', 'USR_ID_USUARIO');
  }

  // Obtener usuarios con información del empleado y rol
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT u.USR_ID_USUARIO, u.USR_USERNAME, 
             e.EMP_PRIMER_NOMBRE, e.EMP_PRIMER_APELLIDO,
             r.ROL_NOMBRE,
             pu.PTS_NOMBRE,
             d.DEP_NOMBRE
      FROM SGA_USUARIO u
      JOIN SGA_EMPLEADO e ON u.EMP_ID_EMPLEADO = e.EMP_ID_EMPLEADO
      JOIN SGA_ROL r ON u.ROL_ID_ROL = r.ROL_ID_ROL
      JOIN SGA_PUESTO pu ON e.PTS_ID_PUESTO = pu.PTS_ID_PUESTO
      JOIN SGA_DEPARTAMENTO d ON e.DEP_ID = d.DEP_ID
      ORDER BY u.USR_USERNAME
    `);
  }

  // Buscar usuario por username
  async findByUsername(username) {
    return await this.executeQuery(`
      SELECT u.*, 
             e.EMP_PRIMER_NOMBRE, e.EMP_PRIMER_APELLIDO,
             r.ROL_NOMBRE
      FROM SGA_USUARIO u
      JOIN SGA_EMPLEADO e ON u.EMP_ID_EMPLEADO = e.EMP_ID_EMPLEADO
      JOIN SGA_ROL r ON u.ROL_ID_ROL = r.ROL_ID_ROL
      WHERE u.USR_USERNAME = :username
    `, [username]);
  }
}

class RolPermisoModel extends BaseModel {
  constructor() {
    super('SGA_ROL_PERMISO', 'ROL_ID_ROL');
  }

  // Obtener permisos por rol
  async findPermissionsByRole(rolId) {
    return await this.executeQuery(`
      SELECT rp.*, r.ROL_NOMBRE, p.PER_NOMBRE
      FROM SGA_ROL_PERMISO rp
      JOIN SGA_ROL r ON rp.ROL_ID_ROL = r.ROL_ID_ROL
      JOIN SGA_PERMISO p ON rp.PER_ID_PERMISO = p.PER_ID_PERMISO
      WHERE rp.ROL_ID_ROL = :rolId
    `, [rolId]);
  }
}

class MantenimientoAvionModel extends BaseModel {
  constructor() {
    super('SGA_MANTENIMIENTO_AVION', 'MAV_ID');
  }

  // Obtener mantenimientos con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT m.*, 
             a.AVN_MATRICULA,
             ma.MDA_NOMBRE_MODELO,
             e.EMP_PRIMER_NOMBRE, e.EMP_PRIMER_APELLIDO
      FROM SGA_MANTENIMIENTO_AVION m
      JOIN SGA_AVION a ON m.AVN_ID_AVION = a.AVN_ID_AVION
      JOIN SGA_MODELO_AVION ma ON a.MDA_ID_MODELO = ma.MDA_ID_MODELO
      JOIN SGA_EMPLEADO e ON m.EMP_ID_EMPLEADO = e.EMP_ID_EMPLEADO
      ORDER BY m.MAV_FECHA_INICIO DESC
    `);
  }
}

class TripulacionVueloModel extends BaseModel {
  constructor() {
    super('SGA_TRIPULACION_VUELO', 'TRV_ID_TRIPULACION');
  }

  // Obtener tripulación con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT t.*, 
             e.EMP_PRIMER_NOMBRE, e.EMP_PRIMER_APELLIDO,
             v.VL_FECHA,
             pr.PRV_NUMERO_VUELO,
             rt.RTC_NOMBRE
      FROM SGA_TRIPULACION_VUELO t
      JOIN SGA_EMPLEADO e ON t.EMP_ID_EMPLEADO = e.EMP_ID_EMPLEADO
      JOIN SGA_VUELO v ON t.VL_ID_VUELO = v.VL_ID_VUELO
      JOIN SGA_PROGRAMA_VUELO pr ON v.PRV_ID_PROGRAMA = pr.PRV_ID_PROGRAMA
      JOIN SGA_ROL_TRIPULACION rt ON t.RTC_ID_ROL_TRIPULACION = rt.RTC_ID_ROL_TRIPULACION
      ORDER BY v.VL_FECHA DESC, pr.PRV_NUMERO_VUELO, rt.RTC_NOMBRE
    `);
  }

  // Obtener tripulación por vuelo
  async findByFlight(vueloId) {
    return await this.executeQuery(`
      SELECT t.*, 
             e.EMP_PRIMER_NOMBRE, e.EMP_PRIMER_APELLIDO,
             rt.RTC_NOMBRE
      FROM SGA_TRIPULACION_VUELO t
      JOIN SGA_EMPLEADO e ON t.EMP_ID_EMPLEADO = e.EMP_ID_EMPLEADO
      JOIN SGA_ROL_TRIPULACION rt ON t.RTC_ID_ROL_TRIPULACION = rt.RTC_ID_ROL_TRIPULACION
      WHERE t.VL_ID_VUELO = :vueloId
      ORDER BY rt.RTC_NOMBRE, e.EMP_PRIMER_APELLIDO
    `, [vueloId]);
  }
}

class PistaModel extends BaseModel {
  constructor() {
    super('SGA_PISTA', 'PIS_ID_PISTA');
  }

  // Obtener pistas con información del aeropuerto
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT p.*, a.APT_NOMBRE, a.APT_CODIGO
      FROM SGA_PISTA p
      JOIN SGA_AEROPUERTO a ON p.APT_ID_AEROPUERTO = a.APT_ID_AEROPUERTO
      ORDER BY a.APT_NOMBRE, p.PIS_NOMBRE
    `);
  }
}

class AsignacionPistaModel extends BaseModel {
  constructor() {
    super('SGA_ASIGNACION_PISTA', 'ASP_ID_ASIGNACION_PISTA');
  }

  // Obtener asignaciones de pista con información completa
  async findAllWithDetails() {
    return await this.executeQuery(`
      SELECT ap.*, 
             v.VL_FECHA,
             pr.PRV_NUMERO_VUELO,
             p.PIS_NOMBRE,
             a.APT_NOMBRE,
             top.TOP_NOMBRE
      FROM SGA_ASIGNACION_PISTA ap
      JOIN SGA_VUELO v ON ap.VL_ID_VUELO = v.VL_ID_VUELO
      JOIN SGA_PROGRAMA_VUELO pr ON v.PRV_ID_PROGRAMA = pr.PRV_ID_PROGRAMA
      JOIN SGA_PISTA p ON ap.PIS_ID_PISTA = p.PIS_ID_PISTA
      JOIN SGA_AEROPUERTO a ON p.APT_ID_AEROPUERTO = a.APT_ID_AEROPUERTO
      JOIN SGA_TIPO_OPERACION_PISTA top ON ap.TOP_ID_OPERACION_PISTA = top.TOP_ID_OPERACION_PISTA
      ORDER BY ap.ASP_FECHA DESC, v.VL_FECHA DESC
    `);
  }
}

module.exports = {
  AsignacionEmpleadoModel,
  PagoModel,
  ReembolsoModel,
  PasajeroVueloModel,
  CheckinModel,
  AsientoModel,
  AsignacionAsientoModel,
  UsuarioModel,
  RolPermisoModel,
  MantenimientoAvionModel,
  TripulacionVueloModel,
  PistaModel,
  AsignacionPistaModel
};