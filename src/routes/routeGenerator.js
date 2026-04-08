const express = require('express');

// Función para crear rutas CRUD estándar para cualquier entidad
function createEntityRoutes(controller, basePath = '') {
  const router = express.Router();

  // GET /:entity - Obtener todos los registros
  router.get(`${basePath}`, (req, res) => controller.getAll(req, res));

  // GET /:entity/count - Contar registros
  router.get(`${basePath}/count`, (req, res) => controller.count(req, res));

  // GET /:entity/:id - Obtener un registro por ID
  router.get(`${basePath}/:id`, (req, res) => controller.getById(req, res));

  // POST /:entity - Crear un nuevo registro
  router.post(`${basePath}`, (req, res) => controller.create(req, res));

  // PUT /:entity/:id - Actualizar un registro
  router.put(`${basePath}/:id`, (req, res) => controller.update(req, res));

  // DELETE /:entity/:id - Eliminar un registro
  router.delete(`${basePath}/:id`, (req, res) => controller.delete(req, res));

  return router;
}

module.exports = { createEntityRoutes };