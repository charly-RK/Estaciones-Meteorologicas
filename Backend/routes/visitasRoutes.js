//routes/visitasRoutes.js
const express = require('express');
const Visitas = require('../models/visitasModel');
const router = express.Router();

// Endpoint para obtener estadísticas de visitas
router.get('/visitas', async (req, res) => {
    try {
        const totalVisitas = await Visitas.contar();
        const recientes = await Visitas.visitasRecientes();
        res.json({ totalVisitas, recientes });
    } catch (error) {
        console.error('Error al obtener las visitas:', error);
        res.status(500).json({ message: 'Error al obtener las visitas' });
    }
});

module.exports = router;
