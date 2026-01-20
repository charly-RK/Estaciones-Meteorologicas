const model = require('../../models/administracion/dataloggerModel_1');

const getAll = async (req, res) => {
  try {
    const data = await model.getAllData();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await model.getById(id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener datos por ID' });
  }
};

const getByDateRange = async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'Las fechas de inicio y fin son requeridas' });
    }
    const data = await model.getByDateRange(start, end);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al filtrar por fechas' });
  }
};

const getFilteredData = async (req, res) => {
  const { start, end, id } = req.query;

  if (!start || !end || !id) {
    return res.status(400).json({ error: 'Parámetros start, end e id son obligatorios' });
  }

  try {
    const data = await model.getDataFiltered(start, end, id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAll,
  getById,
  getByDateRange,
  getFilteredData,
};
