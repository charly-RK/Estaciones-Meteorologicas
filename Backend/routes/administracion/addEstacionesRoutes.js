const express = require('express');
const router = express.Router();

const addEstacionesController = require('../../controllers/administracion/addEstacionesController');
const geografiaController = require('../../controllers/administracion/geografiaController');
// Rutas estaciones
router.get('/esta/search', addEstacionesController.searchByIdOrNombre);
router.get('/esta/:id', addEstacionesController.getById);
router.get('/esta', addEstacionesController.getAll);
router.post('/esta', addEstacionesController.create);
router.put('/esta/:id', addEstacionesController.update);
router.delete('/esta/:id', addEstacionesController.delete);

router.get('/tipoestacion', geografiaController.getTiposEstacion);

// Geografía
router.get('/provincias', geografiaController.getAllData); 
router.get('/cantones/:prov_id', geografiaController.getCantones);
router.get('/parroquias/:cant_id', geografiaController.getParroquias);

module.exports = router;
