const express = require('express');
const router = express.Router();
const controller = require('../../controllers/administracion/dataloggerController_1');

// Ruta para filtrar por fechas y estación
router.get('/filter', controller.getFilteredData);
// Obtener datos por ID de estación
router.get('/:id', controller.getById);

// Obtener todos los datos
router.get('/', controller.getAll);

// Filtrar por fechas (global)
router.get('/filter/fechas', controller.getByDateRange);



module.exports = router;
