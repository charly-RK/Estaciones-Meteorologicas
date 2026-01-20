// models/visitanteModel.js
const db = require('../config/db');

const registrarVisitante = async ({ nombre, apellido, correo, cedula, razon_visita }) => {
  const query = `
    INSERT INTO administracion.visitantes (nombre, apellido, correo, cedula, razon_visita)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [nombre, apellido, correo, cedula, razon_visita];
  const result = await db.query(query, values);
  return result.rows[0];
};

const totalVisitantes = async () => {
  const query = 'SELECT COUNT(*) FROM administracion.visitantes';
  const result = await db.query(query);
  return parseInt(result.rows[0].count, 10);
};

module.exports = {
  registrarVisitante,
  totalVisitantes,
};
