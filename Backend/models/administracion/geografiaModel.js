const db = require('../../config/db');

const GeografiaModel = {
  getAllProvincias: async () => {
    const result = await db.query('SELECT * FROM administracion.provincia ORDER BY prov_nombre');
    return result.rows;
  },

  getCantonesByProvincia: async (prov_id) => {
    const result = await db.query('SELECT * FROM administracion.canton WHERE prov_id = $1 ORDER BY cant_nombre', [prov_id]);
    return result.rows;
  },

  getParroquiasByCanton: async (cant_id) => {
    const result = await db.query('SELECT * FROM administracion.parroquia WHERE cant_id = $1 ORDER BY parr_nombre', [cant_id]);
    return result.rows;
  },

  getTiposEstacion: async () => {
    const result = await db.query('SELECT * FROM administracion.tipoestacion ORDER BY tiposesta_nombre');
    return result.rows;
  }
};

module.exports = GeografiaModel;
