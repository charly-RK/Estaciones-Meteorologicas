// models/visitasModel.js
const db = require('../config/db');

const Visitas = {
    // Registrar una visita con IP y User-Agent
    registrar: async (ip, userAgent) => {
        await db.query(
            'INSERT INTO administracion.visitas (ip, user_agent) VALUES ($1, $2)',
            [ip, userAgent]
        );
    },

    // Contar total de visitas
    contar: async () => {
        const result = await db.query('SELECT COUNT(*) AS total FROM administracion.visitas');
        return result.rows[0].total;
    },

    // Obtener visitas recientes
    visitasRecientes: async (limit = 10) => {
        const result = await db.query(
            'SELECT fecha, ip, user_agent FROM administracion.visitas ORDER BY fecha DESC LIMIT $1',
            [limit]
        );
        return result.rows;
    }
};

module.exports = Visitas;
