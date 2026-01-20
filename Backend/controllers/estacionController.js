const EstacionModel = require('../models/estacionModel');

const estacionController = {
    getAll: async (req, res) => {
        try {
            const estaciones = await EstacionModel.getAll();
            res.status(200).json(estaciones);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener estaciones', error: error.message });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const estacion = await EstacionModel.getById(id);
            if (!estacion) {
                return res.status(404).json({ message: 'Estación no encontrada' });
            }
            res.status(200).json(estacion);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la estación', error: error.message });
        }
    },

    searchByIdOrNombre: async (req, res) => {
        const { search } = req.query;
        if (!search) {
            return res.status(400).json({ message: 'Parámetro de búsqueda requerido' });
        }

        try {
            const estaciones = await EstacionModel.getByIdOrNombre(search);
            if (estaciones.length === 0) {
                return res.status(404).json({ message: 'No se encontraron estaciones' });
            }
            res.status(200).json(estaciones);
        } catch (error) {
            res.status(500).json({ message: 'Error al buscar la estación', error: error.message });
        }
    },
};

module.exports = estacionController;
