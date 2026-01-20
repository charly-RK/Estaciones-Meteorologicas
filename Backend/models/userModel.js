// models/userModel.js
const db = require('../config/db');

const User = {
    findAll: async () => {
        const result = await db.query('SELECT * FROM administracion.usuarios');
        return result.rows;
    },

    create: async (user) => {
        const { nombre, apellido, correo, contrasena, rol, foto } = user;
        const result = await db.query(
            `INSERT INTO administracion.usuarios (nombre, apellido, correo, contrasena, rol, foto)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [nombre, apellido, correo, contrasena, rol, foto]
        );
        return result.rows[0];
    },

    findRecent: async (limit = 5) => {
        const result = await db.query(
            `SELECT nombre, correo, fecha_registro 
             FROM administracion.usuarios
             ORDER BY fecha_registro DESC 
             LIMIT $1`,
            [limit]
        );
        return result.rows;
    },
};

module.exports = User;
