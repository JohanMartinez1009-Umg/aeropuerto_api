const BaseController = require('./BaseController');
const { createModels, ENTITY_CONFIG } = require('../models/index');
const { createEntityRoutes } = require('../routes/routeGenerator');

// Crear instancias de todos los modelos
const models = createModels();

// Función para crear todos los controladores
const createControllers = () => {
  const controllers = {};
  
  Object.entries(ENTITY_CONFIG).forEach(([entityKey, config]) => {
    const model = models[config.model];
    if (model) {
      controllers[entityKey] = new BaseController(model, config.name);
    }
  });
  
  return controllers;
};

// Crear controladores específicos con lógica personalizada
class VueloController extends BaseController {
  constructor(model) {
    super(model, 'Vuelo');
  }

  // Obtener vuelos con información completa
  async getAllWithDetails(req, res) {
    try {
      const vuelos = await this.model.findAllWithDetails();
      
      res.json({
        success: true,
        data: vuelos,
        total: vuelos.length,
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al obtener ${this.entityName} con detalles`,
        error: error.message
      });
    }
  }

  // Obtener vuelos por fecha
  async getByDate(req, res) {
    try {
      const { fecha } = req.params;
      const vuelos = await this.model.findByDate(fecha);
      
      res.json({
        success: true,
        data: vuelos,
        total: vuelos.length,
        fecha,
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al obtener ${this.entityName} por fecha`,
        error: error.message
      });
    }
  }
}

class PasajeroController extends BaseController {
  constructor(model) {
    super(model, 'Pasajero');
  }

  // Obtener pasajeros con información del país
  async getAllWithCountry(req, res) {
    try {
      const pasajeros = await this.model.findAllWithCountry();
      
      res.json({
        success: true,
        data: pasajeros,
        total: pasajeros.length,
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al obtener ${this.entityName} con información del país`,
        error: error.message
      });
    }
  }

  // Buscar pasajero por pasaporte
  async getByPassport(req, res) {
    try {
      const { pasaporte } = req.params;
      const pasajeros = await this.model.findByPassport(pasaporte);
      
      if (pasajeros.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Pasajero no encontrado con ese pasaporte'
        });
      }

      res.json({
        success: true,
        data: pasajeros[0],
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al buscar ${this.entityName} por pasaporte`,
        error: error.message
      });
    }
  }
}

class UsuarioController extends BaseController {
  constructor(model) {
    super(model, 'Usuario');
  }

  // Obtener usuarios sin mostrar la contraseña
  async getAll(req, res) {
    try {
      const usuarios = await this.model.findAllWithDetails();
      
      res.json({
        success: true,
        data: usuarios,
        total: usuarios.length,
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al obtener ${this.entityName}`,
        error: error.message
      });
    }
  }

  // Buscar usuario por username
  async getByUsername(req, res) {
    try {
      const { username } = req.params;
      const usuarios = await this.model.findByUsername(username);
      
      if (usuarios.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      // Remover la contraseña de la respuesta
      const usuario = usuarios[0];
      delete usuario.USR_PASSWORD;

      res.json({
        success: true,
        data: usuario,
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al buscar ${this.entityName}`,
        error: error.message
      });
    }
  }
}

class HistorialVueloController extends BaseController {
  constructor(model) {
    super(model, 'Historial Vuelo');
  }

  // Obtener historial por vuelo
  async getByFlight(req, res) {
    try {
      const { vueloId } = req.params;
      const historial = await this.model.findByFlight(vueloId);
      
      res.json({
        success: true,
        data: historial,
        total: historial.length,
        vueloId,
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al obtener ${this.entityName} por vuelo`,
        error: error.message
      });
    }
  }
}

class PasajeroVueloController extends BaseController {
  constructor(model) {
    super(model, 'Pasajero Vuelo');
  }

  // Obtener pasajeros por vuelo
  async getByFlight(req, res) {
    try {
      const { vueloId } = req.params;
      const pasajeros = await this.model.findByFlight(vueloId);
      
      res.json({
        success: true,
        data: pasajeros,
        total: pasajeros.length,
        vueloId,
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al obtener ${this.entityName} por vuelo`,
        error: error.message
      });
    }
  }
}

class TripulacionVueloController extends BaseController {
  constructor(model) {
    super(model, 'Tripulación Vuelo');
  }

  // Obtener tripulación por vuelo
  async getByFlight(req, res) {
    try {
      const { vueloId } = req.params;
      const tripulacion = await this.model.findByFlight(vueloId);
      
      res.json({
        success: true,
        data: tripulacion,
        total: tripulacion.length,
        vueloId,
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al obtener ${this.entityName} por vuelo`,
        error: error.message
      });
    }
  }
}

class AsientoController extends BaseController {
  constructor(model) {
    super(model, 'Asiento');
  }

  // Obtener asientos por avión
  async getByAircraft(req, res) {
    try {
      const { avionId } = req.params;
      const asientos = await this.model.findByAircraft(avionId);
      
      res.json({
        success: true,
        data: asientos,
        total: asientos.length,
        avionId,
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al obtener ${this.entityName} por avión`,
        error: error.message
      });
    }
  }
}

class RolPermisoController extends BaseController {
  constructor(model) {
    super(model, 'Rol Permiso');
  }

  // Obtener permisos por rol
  async getPermissionsByRole(req, res) {
    try {
      const { rolId } = req.params;
      const permisos = await this.model.findPermissionsByRole(rolId);
      
      res.json({
        success: true,
        data: permisos,
        total: permisos.length,
        rolId,
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al obtener permisos por rol`,
        error: error.message
      });
    }
  }
}

// Crear instancias de controladores personalizados
const createCustomControllers = () => {
  return {
    vuelo: new VueloController(models.vueloModel),
    pasajero: new PasajeroController(models.pasajeroModel),
    usuario: new UsuarioController(models.usuarioModel),
    'historial-vuelo': new HistorialVueloController(models.historialVueloModel),
    'pasajero-vuelo': new PasajeroVueloController(models.pasajeroVueloModel),
    'tripulacion-vuelo': new TripulacionVueloController(models.tripulacionVueloModel),
    asiento: new AsientoController(models.asientoModel),
    'rol-permiso': new RolPermisoController(models.rolPermisoModel)
  };
};

module.exports = {
  createControllers,
  createCustomControllers,
  VueloController,
  PasajeroController,
  UsuarioController,
  HistorialVueloController,
  PasajeroVueloController,
  TripulacionVueloController,
  AsientoController,
  RolPermisoController
};