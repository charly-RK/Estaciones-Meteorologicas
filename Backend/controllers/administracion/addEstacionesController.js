const addEstacionesModel = require('../../models/administracion/addEstacionesModel');



const addEstacionesController = {
  getAll: async (req, res) => {
    try {
      const estaciones = await addEstacionesModel.getAll();
      res.status(200).json(estaciones);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener estaciones', error: error.message });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const estacion = await addEstacionesModel.getById(id);
      if (!estacion) {
        return res.status(404).json({ message: 'Estación no encontrada' });
      }
      res.status(200).json(estacion);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la estación', error: error.message });
    }
  },

  create: async (req, res) => {
  try {
    const esta_id = await addEstacionesModel.create(req.body);

    // Recupera la estación recién creada con JOINs (incluye parroquia, cantón, provincia)
    const estacionCreada = await addEstacionesModel.getById(esta_id);

    res.status(201).json({
      message: 'Estación creada exitosamente',
      estacion: estacionCreada
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la estación', error: error.message });
  }
},


update: async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await addEstacionesModel.update(id, req.body);
    if (updated === 0) {
      return res.status(404).json({ message: 'Estación no encontrada' });
    }

    const estacionActualizada = await addEstacionesModel.getById(id);

    res.status(200).json({
      message: 'Estación actualizada correctamente',
      estacion: estacionActualizada
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la estación', error: error.message });
  }
},


  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await addEstacionesModel.delete(id);
      if (deleted === 0) {
        return res.status(404).json({ message: 'Estación no encontrada' });
      }
      res.status(200).json({ message: 'Estación eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la estación', error: error.message });
    }
  },

  searchByIdOrNombre: async (req, res) => {
    const { search } = req.query;
    if (!search) {
      return res.status(400).json({ message: 'Parámetro de búsqueda requerido' });
    }

    try {
      const estaciones = await addEstacionesModel.getByIdOrNombre(search);
      if (estaciones.length === 0) {
        return res.status(404).json({ message: 'No se encontraron estaciones' });
      }
      res.status(200).json(estaciones);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar la estación', error: error.message });
    }
  }
};

module.exports = addEstacionesController;
