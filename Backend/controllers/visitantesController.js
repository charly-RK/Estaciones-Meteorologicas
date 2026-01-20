// controllers/visitantesController.js
const visitanteModel = require('../models/visitantesModel');

const registrarVisitante = async (req, res) => {
  try {
    const { nombre, apellido, correo, cedula, razon_visita } = req.body;
    if (!nombre || !apellido || !correo || !cedula) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    const nuevoVisitante = await visitanteModel.registrarVisitante({ nombre, apellido, correo, cedula, razon_visita });
    res.status(201).json(nuevoVisitante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar visitante' });
  }
};

const obtenerTotalVisitantes = async (req, res) => {
  try {
    const total = await visitanteModel.totalVisitantes();
    res.json({ total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener total de visitantes' });
  }
};

module.exports = {
  registrarVisitante,
  obtenerTotalVisitantes,
};
