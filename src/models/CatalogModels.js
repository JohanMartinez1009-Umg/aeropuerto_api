const BaseModel = require('./BaseModel');

// ===== MODELOS CATÁLOGO =====
class PaisModel extends BaseModel {
  constructor() {
    super('SGA_PAIS', 'PA_ID_PAIS');
  }
}

class CiudadModel extends BaseModel {
  constructor() {
    super('SGA_CIUDAD', 'CD_ID_CIUDAD');
  }

  // Obtener ciudades con información del país
  async findAllWithCountry() {
    return await this.executeQuery(`
      SELECT c.*, p.PA_NOMBRE, p.PA_CODIGO 
      FROM SGA_CIUDAD c
      JOIN SGA_PAIS p ON c.PA_ID_PAIS = p.PA_ID_PAIS
      ORDER BY c.CD_NOMBRE
    `);
  }
}

class EstadoAeropuertoModel extends BaseModel {
  constructor() {
    super('SGA_ESTADO_AEROPUERTO', 'EAP_ID_ESTADO_AEROPUERTO');
  }
}

class EstadoAerolineaModel extends BaseModel {
  constructor() {
    super('SGA_ESTADO_AEROLINEA', 'EAL_ID_ESTADO_AEROLINEA');
  }
}

class EstadoAvionModel extends BaseModel {
  constructor() {
    super('SGA_ESTADO_AVION', 'EAV_ID_ESTADO_AVION');
  }
}

class EstadoVueloModel extends BaseModel {
  constructor() {
    super('SGA_ESTADO_VUELO', 'ESV_ID_ESTADO_VUELO');
  }
}

class TipoVueloModel extends BaseModel {
  constructor() {
    super('SGA_TIPO_VUELO', 'ID_TIPO_VUELO');
  }
}

class DiaModel extends BaseModel {
  constructor() {
    super('SGA_DIA', 'DIA_ID_DIA');
  }
}

class ClaseBoletoModel extends BaseModel {
  constructor() {
    super('SGA_CLASE_BOLETO', 'CLB_ID_CLASE_BOLETO');
  }
}

class TipoEquipajeModel extends BaseModel {
  constructor() {
    super('SGA_TIPO_EQUIPAJE', 'TEQ_ID');
  }
}

class TipoUbicacionModel extends BaseModel {
  constructor() {
    super('SGA_TIPO_UBICACION', 'TUB_ID');
  }
}

class EstadoObjetoModel extends BaseModel {
  constructor() {
    super('SGA_ESTADO_OBJETO', 'EOB_ID_ESTADO_OBJETO');
  }
}

class MotivoModel extends BaseModel {
  constructor() {
    super('SGA_MOTIVO', 'MOT_ID_MOTIVO');
  }
}

class PuestoModel extends BaseModel {
  constructor() {
    super('SGA_PUESTO', 'PTS_ID_PUESTO');
  }
}

class DepartamentoModel extends BaseModel {
  constructor() {
    super('SGA_DEPARTAMENTO', 'DEP_ID');
  }
}

class EstadoEmpleadoModel extends BaseModel {
  constructor() {
    super('SGA_ESTADO_EMPLEADO', 'ESE_ID_ESTADO_EMPLEADO');
  }
}

class TerminalModel extends BaseModel {
  constructor() {
    super('SGA_TERMINAL', 'TRM_ID_TERMINAL');
  }
}

class TipoEventoModel extends BaseModel {
  constructor() {
    super('SGA_TIPO_EVENTO', 'TE_ID');
  }
}

class EstadoAsignacionModel extends BaseModel {
  constructor() {
    super('SGA_ESTADO_ASIGNACION', 'EAS_ID_ESTADO_ASIGNACION');
  }
}

class EstadoReservaModel extends BaseModel {
  constructor() {
    super('SGA_ESTADO_RESERVA', 'ESR_ID');
  }
}

// Nuevos catálogos
class TurnoModel extends BaseModel {
  constructor() {
    super('SGA_TURNO', 'TRN_ID');
  }
}

class MetodoPagoModel extends BaseModel {
  constructor() {
    super('SGA_METODO_PAGO', 'MPG_ID');
  }
}

class EstadoReembolsoModel extends BaseModel {
  constructor() {
    super('SGA_ESTADO_REEMBOLSO', 'ESR_ID');
  }
}

class EstadoAbordajeModel extends BaseModel {
  constructor() {
    super('SGA_ESTADO_ABORDAJE', 'EAB_ID_ESTADO_ABORDAJE');
  }
}

class EstadoCheckinModel extends BaseModel {
  constructor() {
    super('SGA_ESTADO_CHECKIN', 'ECK_ID_ESTADO');
  }
}

class EstadoAsientoModel extends BaseModel {
  constructor() {
    super('SGA_ESTADO_ASIENTO', 'EAS_ID_ESTADO');
  }
}

class RolModel extends BaseModel {
  constructor() {
    super('SGA_ROL', 'ROL_ID_ROL');
  }
}

class PermisoModel extends BaseModel {
  constructor() {
    super('SGA_PERMISO', 'PER_ID_PERMISO');
  }
}

class RolTripulacionModel extends BaseModel {
  constructor() {
    super('SGA_ROL_TRIPULACION', 'RTC_ID_ROL_TRIPULACION');
  }
}

class TipoOperacionPistaModel extends BaseModel {
  constructor() {
    super('SGA_TIPO_OPERACION_PISTA', 'TOP_ID_OPERACION_PISTA');
  }
}

module.exports = {
  PaisModel,
  CiudadModel,
  EstadoAeropuertoModel,
  EstadoAerolineaModel,
  EstadoAvionModel,
  EstadoVueloModel,
  TipoVueloModel,
  DiaModel,
  ClaseBoletoModel,
  TipoEquipajeModel,
  TipoUbicacionModel,
  EstadoObjetoModel,
  MotivoModel,
  PuestoModel,
  DepartamentoModel,
  EstadoEmpleadoModel,
  TerminalModel,
  TipoEventoModel,
  EstadoAsignacionModel,
  EstadoReservaModel,
  TurnoModel,
  MetodoPagoModel,
  EstadoReembolsoModel,
  EstadoAbordajeModel,
  EstadoCheckinModel,
  EstadoAsientoModel,
  RolModel,
  PermisoModel,
  RolTripulacionModel,
  TipoOperacionPistaModel
};