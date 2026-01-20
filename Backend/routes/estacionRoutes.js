const express = require('express');
const estacionController = require('../controllers/estacionController');
const router = express.Router();

// Listar todas las estaciones
router.get('/', estacionController.getAll);

// Buscar por ID o Nombre
router.get('/buscar', estacionController.searchByIdOrNombre);

// Obtener una estación por ID
router.get('/:id', estacionController.getById);

module.exports = router;
