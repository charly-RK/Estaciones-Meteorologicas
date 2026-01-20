// routes/visitantesRoutes.js
const express = require('express');
const router = express.Router();
const visitanteController = require('../controllers/visitantesController');

router.post('/registrar', visitanteController.registrarVisitante);
router.get('/total', visitanteController.obtenerTotalVisitantes);

module.exports = router;
