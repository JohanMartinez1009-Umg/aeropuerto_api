const express = require('express');

// Función para crear rutas CRUD estándar para cualquier entidad
function createEntityRoutes(controller, basePath = '') {
  const router = express.Router();

  // ===== RUTAS PRINCIPALES =====
  // GET /:entity - Obtener todos los registros activos
  router.get(`${basePath}`, (req, res) => controller.getAll(req, res));

  // GET /:entity/count - Contar registros activos
  router.get(`${basePath}/count`, (req, res) => controller.count(req, res));

  // GET /:entity/:id - Obtener un registro por ID
  router.get(`${basePath}/:id`, (req, res) => controller.getById(req, res));

  // POST /:entity - Crear un nuevo registro
  router.post(`${basePath}`, (req, res) => controller.create(req, res));

  // PUT /:entity/:id - Actualizar un registro
  router.put(`${basePath}/:id`, (req, res) => controller.update(req, res));

  // DELETE /:entity/:id - Eliminar un registro (borrado lógico)
  router.delete(`${basePath}/:id`, (req, res) => controller.delete(req, res));

  // ===== RUTAS PARA BORRADO LÓGICO =====
  // GET /:entity/all-including-deleted - Obtener todos incluyendo eliminados
  router.get(`${basePath}/all-including-deleted`, (req, res) => controller.getAllIncludingDeleted(req, res));

  // GET /:entity/deleted - Obtener solo registros eliminados
  router.get(`${basePath}/deleted`, (req, res) => controller.getDeleted(req, res));

  // GET /:entity/deleted/count - Contar registros eliminados
  router.get(`${basePath}/deleted/count`, (req, res) => controller.countDeleted(req, res));

  // PUT /:entity/:id/restore - Restaurar un registro eliminado
  router.put(`${basePath}/:id/restore`, (req, res) => controller.restore(req, res));

  // DELETE /:entity/:id/force - Eliminar permanentemente un registro
  router.delete(`${basePath}/:id/force`, (req, res) => controller.forceDelete(req, res));

  return router;
}

module.exports = { createEntityRoutes };