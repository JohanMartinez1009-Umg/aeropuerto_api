const express = require('express');
const { createEntityRoutes } = require('./routeGenerator');
const { createControllers, createCustomControllers } = require('../controllers/index');
const { ENTITY_CONFIG } = require('../models/index');

// Crear un router principal
const router = express.Router();

// Crear todos los controladores
const standardControllers = createControllers();
const customControllers = createCustomControllers();

// Combinar controladores estándar y personalizados
const allControllers = { ...standardControllers, ...customControllers };

// Generar rutas para todas las entidades
Object.entries(ENTITY_CONFIG).forEach(([entityKey, config]) => {
  const controller = allControllers[entityKey];
  
  if (controller) {
    // Crear rutas estándar CRUD
    const entityRoutes = createEntityRoutes(controller);
    router.use(`/sga/${entityKey}`, entityRoutes);
  }
});

// Rutas especiales para controladores personalizados
const customRoutes = express.Router();

// Rutas especiales para Vuelos
if (customControllers.vuelo) {
  customRoutes.get('/vuelo/details', (req, res) => customControllers.vuelo.getAllWithDetails(req, res));
  customRoutes.get('/vuelo/fecha/:fecha', (req, res) => customControllers.vuelo.getByDate(req, res));
}

// Rutas especiales para Pasajeros
if (customControllers.pasajero) {
  customRoutes.get('/pasajero/details', (req, res) => customControllers.pasajero.getAllWithCountry(req, res));
  customRoutes.get('/pasajero/pasaporte/:pasaporte', (req, res) => customControllers.pasajero.getByPassport(req, res));
}

// Rutas especiales para Usuarios
if (customControllers.usuario) {
  customRoutes.get('/usuario/username/:username', (req, res) => customControllers.usuario.getByUsername(req, res));
}

// Rutas especiales para Historial de Vuelo
if (customControllers['historial-vuelo']) {
  customRoutes.get('/historial-vuelo/vuelo/:vueloId', (req, res) => 
    customControllers['historial-vuelo'].getByFlight(req, res)
  );
}

// Rutas especiales para Pasajero-Vuelo
if (customControllers['pasajero-vuelo']) {
  customRoutes.get('/pasajero-vuelo/vuelo/:vueloId', (req, res) => 
    customControllers['pasajero-vuelo'].getByFlight(req, res)
  );
}

// Rutas especiales para Tripulación de Vuelo
if (customControllers['tripulacion-vuelo']) {
  customRoutes.get('/tripulacion-vuelo/vuelo/:vueloId', (req, res) => 
    customControllers['tripulacion-vuelo'].getByFlight(req, res)
  );
}

// Rutas especiales para Asientos
if (customControllers.asiento) {
  customRoutes.get('/asiento/avion/:avionId', (req, res) => 
    customControllers.asiento.getByAircraft(req, res)
  );
}

// Rutas especiales para Rol-Permiso
if (customControllers['rol-permiso']) {
  customRoutes.get('/rol-permiso/rol/:rolId', (req, res) => 
    customControllers['rol-permiso'].getPermissionsByRole(req, res)
  );
}

// Agregar rutas personalizadas al router principal
router.use('/sga', customRoutes);

// Ruta para obtener información sobre todas las entidades disponibles
router.get('/sga', (req, res) => {
  const entities = Object.entries(ENTITY_CONFIG).map(([key, config]) => ({
    endpoint: `/sga/${key}`,
    name: config.name,
    description: `Operaciones CRUD para ${config.name}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    routes: [
      `GET /sga/${key} - Obtener todos los registros`,
      `GET /sga/${key}/count - Contar registros`,
      `GET /sga/${key}/:id - Obtener por ID`,
      `POST /sga/${key} - Crear nuevo registro`,
      `PUT /sga/${key}/:id - Actualizar registro`,
      `DELETE /sga/${key}/:id - Eliminar registro`
    ]
  }));

  const specialRoutes = [
    {
      endpoint: '/sga/vuelo/details',
      description: 'Obtener vuelos con información completa'
    },
    {
      endpoint: '/sga/vuelo/fecha/:fecha',
      description: 'Obtener vuelos por fecha (formato: YYYY-MM-DD)'
    },
    {
      endpoint: '/sga/pasajero/details',
      description: 'Obtener pasajeros con información del país'
    },
    {
      endpoint: '/sga/pasajero/pasaporte/:pasaporte',
      description: 'Buscar pasajero por número de pasaporte'
    },
    {
      endpoint: '/sga/usuario/username/:username',
      description: 'Buscar usuario por nombre de usuario'
    },
    {
      endpoint: '/sga/historial-vuelo/vuelo/:vueloId',
      description: 'Obtener historial de un vuelo específico'
    },
    {
      endpoint: '/sga/pasajero-vuelo/vuelo/:vueloId',
      description: 'Obtener pasajeros de un vuelo específico'
    },
    {
      endpoint: '/sga/tripulacion-vuelo/vuelo/:vueloId',
      description: 'Obtener tripulación de un vuelo específico'
    },
    {
      endpoint: '/sga/asiento/avion/:avionId',
      description: 'Obtener asientos de un avión específico'
    },
    {
      endpoint: '/sga/rol-permiso/rol/:rolId',
      description: 'Obtener permisos de un rol específico'
    }
  ];

  res.json({
    success: true,
    message: 'Sistema de Gestión de Aeropuerto - API REST',
    version: '1.0.0',
    totalEntities: entities.length,
    entities,
    specialRoutes,
    documentation: {
      baseUrl: '/sga',
      usage: {
        list: 'GET /sga/{entity}',
        create: 'POST /sga/{entity}',
        read: 'GET /sga/{entity}/{id}',
        update: 'PUT /sga/{entity}/{id}',
        delete: 'DELETE /sga/{entity}/{id}',
        count: 'GET /sga/{entity}/count'
      },
      queryParameters: {
        limit: 'Limitar número de resultados',
        orderBy: 'Ordenar por campo específico',
        '*': 'Cualquier campo de la tabla para filtrar'
      }
    }
  });
});

module.exports = router;