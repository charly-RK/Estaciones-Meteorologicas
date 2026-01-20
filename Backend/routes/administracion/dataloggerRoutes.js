const express = require('express');
const router = express.Router();

const { obtenerDatosPorMes } = require('../../controllers/administracion/dataloggerController');

// Ruta: /api/datalogger?mes=2&desde=2014-02-01&hasta=2014-02-28&esta_id=2
router.get('/', obtenerDatosPorMes);

module.exports = router;
