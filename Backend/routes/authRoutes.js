//routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const perfilController = require('../controllers/perfilController');
const verifyToken = require('../middlewares/authMiddleware');
const db = require('../config/db');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// Ruta protegida para obtener el perfil del usuario logueado
router.get('/perfil', verifyToken, perfilController.getPerfil);

module.exports = router;
