/**
 * SGA - Sistema de Gestión de Aeropuerto
 * Endpoints de la API para uso del frontend
 *
 * Uso:
 *   const { API, buildUrl } = require('./api-endpoints');
 *   fetch(buildUrl(API.pasajero.getAll))
 *   fetch(buildUrl(API.pasajero.getById, { id: 5 }))
 *   fetch(buildUrl(API.vuelo.getByFecha, { fecha: '2026-04-13' }))
 */

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

/**
 * Construye la URL completa reemplazando los parámetros de ruta.
 * @param {string} path  - Ruta con placeholders, e.g. '/sga/pasajero/:id'
 * @param {object} params - Valores para reemplazar, e.g. { id: 5 }
 * @returns {string} URL completa
 */
function buildUrl(path, params = {}) {
  let url = path;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, encodeURIComponent(value));
  }
  return `${BASE_URL}${url}`;
}

// ─────────────────────────────────────────────
// Función auxiliar para generar rutas CRUD de una entidad
// ─────────────────────────────────────────────
function crudRoutes(entity) {
  const base = `/sga/${entity}`;
  return {
    getAll:               `${base}`,
    count:                `${base}/count`,
    getById:              `${base}/:id`,
    create:               `${base}`,
    update:               `${base}/:id`,
    delete:               `${base}/:id`,
    // Borrado lógico
    getAllIncludingDeleted: `${base}/all-including-deleted`,
    getDeleted:           `${base}/deleted`,
    countDeleted:         `${base}/deleted/count`,
    restore:              `${base}/:id/restore`,
    forceDelete:          `${base}/:id/force`,
  };
}

// ─────────────────────────────────────────────
// Endpoints de la API
// ─────────────────────────────────────────────
const API = {

  // ── General ──────────────────────────────────
  health:    '/health',
  dbTest:    '/db/test',
  sgaInfo:   '/sga',
  sgaTablas: '/sga/tablas',
  sgaInicializar:  '/sga/inicializar',
  sgaEliminarTodo: '/sga/eliminar-todo',

  // ── Catálogos ────────────────────────────────
  pais:                 crudRoutes('pais'),
  ciudad:               crudRoutes('ciudad'),
  estadoAeropuerto:     crudRoutes('estado-aeropuerto'),
  estadoAerolinea:      crudRoutes('estado-aerolinea'),
  estadoAvion:          crudRoutes('estado-avion'),
  estadoVuelo:          crudRoutes('estado-vuelo'),
  tipoVuelo:            crudRoutes('tipo-vuelo'),
  dia:                  crudRoutes('dia'),
  claseBoleto:          crudRoutes('clase-boleto'),
  tipoEquipaje:         crudRoutes('tipo-equipaje'),
  tipoUbicacion:        crudRoutes('tipo-ubicacion'),
  estadoObjeto:         crudRoutes('estado-objeto'),
  motivo:               crudRoutes('motivo'),
  puesto:               crudRoutes('puesto'),
  departamento:         crudRoutes('departamento'),
  estadoEmpleado:       crudRoutes('estado-empleado'),
  terminal:             crudRoutes('terminal'),
  tipoEvento:           crudRoutes('tipo-evento'),
  estadoAsignacion:     crudRoutes('estado-asignacion'),
  estadoReserva:        crudRoutes('estado-reserva'),
  turno:                crudRoutes('turno'),
  metodoPago:           crudRoutes('metodo-pago'),
  estadoReembolso:      crudRoutes('estado-reembolso'),
  estadoAbordaje:       crudRoutes('estado-abordaje'),
  estadoCheckin:        crudRoutes('estado-checkin'),
  estadoAsiento:        crudRoutes('estado-asiento'),
  rol:                  crudRoutes('rol'),
  permiso:              crudRoutes('permiso'),
  rolTripulacion:       crudRoutes('rol-tripulacion'),
  tipoOperacionPista:   crudRoutes('tipo-operacion-pista'),

  // ── Entidades Principales ────────────────────
  aeropuerto:       crudRoutes('aeropuerto'),
  aerolinea:        crudRoutes('aerolinea'),
  modeloAvion:      crudRoutes('modelo-avion'),
  avion:            crudRoutes('avion'),
  programaVuelo:    crudRoutes('programa-vuelo'),
  diaProgramaVuelo: crudRoutes('dia-programa-vuelo'),
  vuelo: {
    ...crudRoutes('vuelo'),
    // Consultas especializadas
    details:        '/sga/vuelo/details',
    getByFecha:     '/sga/vuelo/fecha/:fecha',
  },
  escalaTecnica:    crudRoutes('escala-tecnica'),
  pasajero: {
    ...crudRoutes('pasajero'),
    // Consultas especializadas
    details:        '/sga/pasajero/details',
    getByPasaporte: '/sga/pasajero/pasaporte/:pasaporte',
  },
  puertaEmbarque:   crudRoutes('puerta-embarque'),
  empleado:         crudRoutes('empleado'),

  // ── Operaciones ──────────────────────────────
  reserva:          crudRoutes('reserva'),
  detalle:          crudRoutes('detalle'),
  boleto:           crudRoutes('boleto'),
  equipaje:         crudRoutes('equipaje'),
  asignacionPuerta: crudRoutes('asignacion-puerta'),
  historialVuelo: {
    ...crudRoutes('historial-vuelo'),
    getByVuelo: '/sga/historial-vuelo/vuelo/:vueloId',
  },
  objetoPerdido:    crudRoutes('objeto-perdido'),
  arresto:          crudRoutes('arresto'),

  // ── Entidades Extendidas ─────────────────────
  asignacionEmpleado: crudRoutes('asignacion-empleado'),
  pago:               crudRoutes('pago'),
  reembolso:          crudRoutes('reembolso'),
  pasajeroVuelo: {
    ...crudRoutes('pasajero-vuelo'),
    getByVuelo: '/sga/pasajero-vuelo/vuelo/:vueloId',
  },
  checkin:            crudRoutes('checkin'),
  asiento: {
    ...crudRoutes('asiento'),
    getByAvion: '/sga/asiento/avion/:avionId',
  },
  asignacionAsiento:  crudRoutes('asignacion-asiento'),
  usuario: {
    ...crudRoutes('usuario'),
    getByUsername: '/sga/usuario/username/:username',
  },
  rolPermiso: {
    ...crudRoutes('rol-permiso'),
    getByRol: '/sga/rol-permiso/rol/:rolId',
  },
  mantenimientoAvion: crudRoutes('mantenimiento-avion'),
  tripulacionVuelo: {
    ...crudRoutes('tripulacion-vuelo'),
    getByVuelo: '/sga/tripulacion-vuelo/vuelo/:vueloId',
  },
  pista:              crudRoutes('pista'),
  asignacionPista:    crudRoutes('asignacion-pista'),
};

module.exports = { BASE_URL, API, buildUrl };
