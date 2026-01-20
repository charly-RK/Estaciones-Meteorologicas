const Visitas = require('../models/visitasModel');

const registrarVisita = async (req, res, next) => {
    try {
        const ip = req.ip || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'] || 'Desconocido';
        await Visitas.registrar(ip, userAgent);
    } catch (error) {
        console.error('Error al registrar la visita:', error);
    }
    next();
};

module.exports = registrarVisita;
