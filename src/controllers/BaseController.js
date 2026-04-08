class BaseController {
  constructor(model, entityName) {
    this.model = model;
    this.entityName = entityName;
  }

  // Obtener todos los registros
  async getAll(req, res) {
    try {
      const { limit, orderBy, ...where } = req.query;
      
      const options = {};
      if (limit) options.limit = parseInt(limit);
      if (orderBy) options.orderBy = orderBy;
      if (Object.keys(where).length > 0) options.where = where;

      const records = await this.model.findAll(options);
      const total = await this.model.count(where);

      res.json({
        success: true,
        data: records,
        total,
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

  // Obtener un registro por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const record = await this.model.findById(id);

      if (!record) {
        return res.status(404).json({
          success: false,
          message: `${this.entityName} no encontrado`
        });
      }

      res.json({
        success: true,
        data: record,
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

  // Crear un nuevo registro
  async create(req, res) {
    try {
      const record = await this.model.create(req.body);

      res.status(201).json({
        success: true,
        data: record,
        message: `${this.entityName} creado exitosamente`,
        entity: this.entityName
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: `Error al crear ${this.entityName}`,
        error: error.message
      });
    }
  }

  // Actualizar un registro
  async update(req, res) {
    try {
      const { id } = req.params;
      const record = await this.model.update(id, req.body);

      res.json({
        success: true,
        data: record,
        message: `${this.entityName} actualizado exitosamente`,
        entity: this.entityName
      });
    } catch (error) {
      const status = error.message === 'Registro no encontrado' ? 404 : 400;
      res.status(status).json({
        success: false,
        message: `Error al actualizar ${this.entityName}`,
        error: error.message
      });
    }
  }

  // Eliminar un registro
  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await this.model.delete(id);

      res.json({
        success: true,
        message: `${this.entityName} eliminado exitosamente`,
        entity: this.entityName
      });
    } catch (error) {
      const status = error.message === 'Registro no encontrado' ? 404 : 400;
      res.status(status).json({
        success: false,
        message: `Error al eliminar ${this.entityName}`,
        error: error.message
      });
    }
  }

  // Contar registros
  async count(req, res) {
    try {
      const where = req.query;
      const total = await this.model.count(where);

      res.json({
        success: true,
        data: { total },
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al contar ${this.entityName}`,
        error: error.message
      });
    }
  }

  // ===== MÉTODOS PARA BORRADO LÓGICO =====

  // Obtener todos los registros incluyendo eliminados
  async getAllIncludingDeleted(req, res) {
    try {
      const { limit, orderBy, ...where } = req.query;
      
      const options = {};
      if (limit) options.limit = parseInt(limit);
      if (orderBy) options.orderBy = orderBy;
      if (Object.keys(where).length > 0) options.where = where;

      const records = await this.model.findAllIncludingDeleted(options);

      res.json({
        success: true,
        data: records,
        total: records.length,
        message: `${this.entityName} obtenidos incluyendo eliminados`,
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al obtener ${this.entityName} incluyendo eliminados`,
        error: error.message
      });
    }
  }

  // Obtener solo registros eliminados
  async getDeleted(req, res) {
    try {
      const { limit, orderBy, ...where } = req.query;
      
      const options = {};
      if (limit) options.limit = parseInt(limit);
      if (orderBy) options.orderBy = orderBy;
      if (Object.keys(where).length > 0) options.where = where;

      const records = await this.model.findDeleted(options);
      const total = await this.model.countDeleted(where);

      res.json({
        success: true,
        data: records,
        total,
        message: `${this.entityName} eliminados obtenidos`,
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al obtener ${this.entityName} eliminados`,
        error: error.message
      });
    }
  }

  // Restaurar un registro eliminado
  async restore(req, res) {
    try {
      const { id } = req.params;
      const result = await this.model.restore(id);

      res.json({
        success: true,
        message: `${this.entityName} restaurado exitosamente`,
        entity: this.entityName
      });
    } catch (error) {
      const status = error.message.includes('no encontrado') ? 404 : 400;
      res.status(status).json({
        success: false,
        message: `Error al restaurar ${this.entityName}`,
        error: error.message
      });
    }
  }

  // Eliminar permanentemente un registro
  async forceDelete(req, res) {
    try {
      const { id } = req.params;
      const result = await this.model.forceDelete(id);

      res.json({
        success: true,
        message: `${this.entityName} eliminado permanentemente`,
        entity: this.entityName
      });
    } catch (error) {
      const status = error.message === 'Registro no encontrado' ? 404 : 400;
      res.status(status).json({
        success: false,
        message: `Error al eliminar permanentemente ${this.entityName}`,
        error: error.message
      });
    }
  }

  // Contar registros eliminados
  async countDeleted(req, res) {
    try {
      const where = req.query;
      const total = await this.model.countDeleted(where);

      res.json({
        success: true,
        data: { total },
        message: `Total de ${this.entityName} eliminados`,
        entity: this.entityName
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error al contar ${this.entityName} eliminados`,
        error: error.message
      });
    }
  }
}

module.exports = BaseController;