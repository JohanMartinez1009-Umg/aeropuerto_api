const BaseModel = require('./BaseModel');
const BaseController = require('../controllers/BaseController');

// Importar todos los modelos
const CatalogModels = require('./CatalogModels');
const MainModels = require('./MainModels');
const OperationModels = require('./OperationModels');
const ExtendedModels = require('./ExtendedModels');

// Función para crear instancias de todos los modelos
const createModels = () => {
  return {
    // Modelos de Catálogo
    paisModel: new CatalogModels.PaisModel(),
    ciudadModel: new CatalogModels.CiudadModel(),
    estadoAeropuertoModel: new CatalogModels.EstadoAeropuertoModel(),
    estadoAerolineaModel: new CatalogModels.EstadoAerolineaModel(),
    estadoAvionModel: new CatalogModels.EstadoAvionModel(),
    estadoVueloModel: new CatalogModels.EstadoVueloModel(),
    tipoVueloModel: new CatalogModels.TipoVueloModel(),
    diaModel: new CatalogModels.DiaModel(),
    claseBoletoModel: new CatalogModels.ClaseBoletoModel(),
    tipoEquipajeModel: new CatalogModels.TipoEquipajeModel(),
    tipoUbicacionModel: new CatalogModels.TipoUbicacionModel(),
    estadoObjetoModel: new CatalogModels.EstadoObjetoModel(),
    motivoModel: new CatalogModels.MotivoModel(),
    puestoModel: new CatalogModels.PuestoModel(),
    departamentoModel: new CatalogModels.DepartamentoModel(),
    estadoEmpleadoModel: new CatalogModels.EstadoEmpleadoModel(),
    terminalModel: new CatalogModels.TerminalModel(),
    tipoEventoModel: new CatalogModels.TipoEventoModel(),
    estadoAsignacionModel: new CatalogModels.EstadoAsignacionModel(),
    estadoReservaModel: new CatalogModels.EstadoReservaModel(),
    turnoModel: new CatalogModels.TurnoModel(),
    metodoPagoModel: new CatalogModels.MetodoPagoModel(),
    estadoReembolsoModel: new CatalogModels.EstadoReembolsoModel(),
    estadoAbordajeModel: new CatalogModels.EstadoAbordajeModel(),
    estadoCheckinModel: new CatalogModels.EstadoCheckinModel(),
    estadoAsientoModel: new CatalogModels.EstadoAsientoModel(),
    rolModel: new CatalogModels.RolModel(),
    permisoModel: new CatalogModels.PermisoModel(),
    rolTripulacionModel: new CatalogModels.RolTripulacionModel(),
    tipoOperacionPistaModel: new CatalogModels.TipoOperacionPistaModel(),

    // Modelos Principales
    aeropuertoModel: new MainModels.AeropuertoModel(),
    aerolineaModel: new MainModels.AerolineaModel(),
    modeloAvionModel: new MainModels.ModeloAvionModel(),
    avionModel: new MainModels.AvionModel(),
    programaVueloModel: new MainModels.ProgramaVueloModel(),
    díaProgramaVueloModel: new MainModels.DíaProgramaVueloModel(),
    vueloModel: new MainModels.VueloModel(),
    escalaTecnicaModel: new MainModels.EscalaTecnicaModel(),
    pasajeroModel: new MainModels.PasajeroModel(),
    puertaEmbarqueModel: new MainModels.PuertaEmbarqueModel(),
    empleadoModel: new MainModels.EmpleadoModel(),

    // Modelos de Operación
    reservaModel: new OperationModels.ReservaModel(),
    detalleModel: new OperationModels.DetalleModel(),
    boletoModel: new OperationModels.BoletoModel(),
    equipajeModel: new OperationModels.EquipajeModel(),
    asignacionPuertaModel: new OperationModels.AsignacionPuertaModel(),
    historialVueloModel: new OperationModels.HistorialVueloModel(),
    objetoPerdidoModel: new OperationModels.ObjetoPerdidoModel(),
    arrestoModel: new OperationModels.ArrestoModel(),

    // Modelos Extendidos
    asignacionEmpleadoModel: new ExtendedModels.AsignacionEmpleadoModel(),
    pagoModel: new ExtendedModels.PagoModel(),
    reembolsoModel: new ExtendedModels.ReembolsoModel(),
    pasajeroVueloModel: new ExtendedModels.PasajeroVueloModel(),
    checkinModel: new ExtendedModels.CheckinModel(),
    asientoModel: new ExtendedModels.AsientoModel(),
    asignacionAsientoModel: new ExtendedModels.AsignacionAsientoModel(),
    usuarioModel: new ExtendedModels.UsuarioModel(),
    rolPermisoModel: new ExtendedModels.RolPermisoModel(),
    mantenimientoAvionModel: new ExtendedModels.MantenimientoAvionModel(),
    tripulacionVueloModel: new ExtendedModels.TripulacionVueloModel(),
    pistaModel: new ExtendedModels.PistaModel(),
    asignacionPistaModel: new ExtendedModels.AsignacionPistaModel()
  };
};

// Configuración de entidades con sus modelos y nombres
const ENTITY_CONFIG = {
  // Catálogos
  pais: { model: 'paisModel', name: 'País' },
  ciudad: { model: 'ciudadModel', name: 'Ciudad' },
  'estado-aeropuerto': { model: 'estadoAeropuertoModel', name: 'Estado Aeropuerto' },
  'estado-aerolinea': { model: 'estadoAerolineaModel', name: 'Estado Aerolínea' },
  'estado-avion': { model: 'estadoAvionModel', name: 'Estado Avión' },
  'estado-vuelo': { model: 'estadoVueloModel', name: 'Estado Vuelo' },
  'tipo-vuelo': { model: 'tipoVueloModel', name: 'Tipo Vuelo' },
  dia: { model: 'diaModel', name: 'Día' },
  'clase-boleto': { model: 'claseBoletoModel', name: 'Clase Boleto' },
  'tipo-equipaje': { model: 'tipoEquipajeModel', name: 'Tipo Equipaje' },
  'tipo-ubicacion': { model: 'tipoUbicacionModel', name: 'Tipo Ubicación' },
  'estado-objeto': { model: 'estadoObjetoModel', name: 'Estado Objeto' },
  motivo: { model: 'motivoModel', name: 'Motivo' },
  puesto: { model: 'puestoModel', name: 'Puesto' },
  departamento: { model: 'departamentoModel', name: 'Departamento' },
  'estado-empleado': { model: 'estadoEmpleadoModel', name: 'Estado Empleado' },
  terminal: { model: 'terminalModel', name: 'Terminal' },
  'tipo-evento': { model: 'tipoEventoModel', name: 'Tipo Evento' },
  'estado-asignacion': { model: 'estadoAsignacionModel', name: 'Estado Asignación' },
  'estado-reserva': { model: 'estadoReservaModel', name: 'Estado Reserva' },
  turno: { model: 'turnoModel', name: 'Turno' },
  'metodo-pago': { model: 'metodoPagoModel', name: 'Método Pago' },
  'estado-reembolso': { model: 'estadoReembolsoModel', name: 'Estado Reembolso' },
  'estado-abordaje': { model: 'estadoAbordajeModel', name: 'Estado Abordaje' },
  'estado-checkin': { model: 'estadoCheckinModel', name: 'Estado Check-in' },
  'estado-asiento': { model: 'estadoAsientoModel', name: 'Estado Asiento' },
  rol: { model: 'rolModel', name: 'Rol' },
  permiso: { model: 'permisoModel', name: 'Permiso' },
  'rol-tripulacion': { model: 'rolTripulacionModel', name: 'Rol Tripulación' },
  'tipo-operacion-pista': { model: 'tipoOperacionPistaModel', name: 'Tipo Operación Pista' },

  // Entidades principales
  aeropuerto: { model: 'aeropuertoModel', name: 'Aeropuerto' },
  aerolinea: { model: 'aerolineaModel', name: 'Aerolínea' },
  'modelo-avion': { model: 'modeloAvionModel', name: 'Modelo Avión' },
  avion: { model: 'avionModel', name: 'Avión' },
  'programa-vuelo': { model: 'programaVueloModel', name: 'Programa Vuelo' },
  'dia-programa-vuelo': { model: 'díaProgramaVueloModel', name: 'Día Programa Vuelo' },
  vuelo: { model: 'vueloModel', name: 'Vuelo' },
  'escala-tecnica': { model: 'escalaTecnicaModel', name: 'Escala Técnica' },
  pasajero: { model: 'pasajeroModel', name: 'Pasajero' },
  'puerta-embarque': { model: 'puertaEmbarqueModel', name: 'Puerta Embarque' },
  empleado: { model: 'empleadoModel', name: 'Empleado' },

  // Operaciones
  reserva: { model: 'reservaModel', name: 'Reserva' },
  detalle: { model: 'detalleModel', name: 'Detalle' },
  boleto: { model: 'boletoModel', name: 'Boleto' },
  equipaje: { model: 'equipajeModel', name: 'Equipaje' },
  'asignacion-puerta': { model: 'asignacionPuertaModel', name: 'Asignación Puerta' },
  'historial-vuelo': { model: 'historialVueloModel', name: 'Historial Vuelo' },
  'objeto-perdido': { model: 'objetoPerdidoModel', name: 'Objeto Perdido' },
  arresto: { model: 'arrestoModel', name: 'Arresto' },

  // Entidades extendidas
  'asignacion-empleado': { model: 'asignacionEmpleadoModel', name: 'Asignación Empleado' },
  pago: { model: 'pagoModel', name: 'Pago' },
  reembolso: { model: 'reembolsoModel', name: 'Reembolso' },
  'pasajero-vuelo': { model: 'pasajeroVueloModel', name: 'Pasajero Vuelo' },
  checkin: { model: 'checkinModel', name: 'Check-in' },
  asiento: { model: 'asientoModel', name: 'Asiento' },
  'asignacion-asiento': { model: 'asignacionAsientoModel', name: 'Asignación Asiento' },
  usuario: { model: 'usuarioModel', name: 'Usuario' },
  'rol-permiso': { model: 'rolPermisoModel', name: 'Rol Permiso' },
  'mantenimiento-avion': { model: 'mantenimientoAvionModel', name: 'Mantenimiento Avión' },
  'tripulacion-vuelo': { model: 'tripulacionVueloModel', name: 'Tripulación Vuelo' },
  pista: { model: 'pistaModel', name: 'Pista' },
  'asignacion-pista': { model: 'asignacionPistaModel', name: 'Asignación Pista' }
};

module.exports = {
  BaseModel,
  BaseController,
  createModels,
  ENTITY_CONFIG,
  ...CatalogModels,
  ...MainModels,
  ...OperationModels,
  ...ExtendedModels
};