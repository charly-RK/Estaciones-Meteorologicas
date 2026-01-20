const GeografiaModel = require('../../models/administracion/geografiaModel');

const geografiaController = {
  getAllData: async (req, res) => {
    try {
      const provincias = await GeografiaModel.getAllProvincias();
      const tiposEstacion = await GeografiaModel.getTiposEstacion();
      res.status(200).json({ provincias, tiposEstacion });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener datos geográficos', error: error.message });
    }
  },

  getCantones: async (req, res) => {
    const { prov_id } = req.params;
    try {
      const cantones = await GeografiaModel.getCantonesByProvincia(prov_id);
      res.status(200).json(cantones);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener cantones', error: error.message });
    }
  },

  getParroquias: async (req, res) => {
    const { cant_id } = req.params;
    try {
      const parroquias = await GeografiaModel.getParroquiasByCanton(cant_id);
      res.status(200).json(parroquias);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener parroquias', error: error.message });
    }
  },
  
  // NUEVO método para tipos de estación
  getTiposEstacion: async (req, res) => {
    try {
      const tiposEstacion = await GeografiaModel.getTiposEstacion();
      res.status(200).json(tiposEstacion);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener tipos de estación', error: error.message });
    }
  }

};

module.exports = geografiaController;
