const db = require('../../config/db');

const getDataloggerData = async (mes, fechaInicio, fechaFin, esta_id) => {
  if (mes < 1 || mes > 12) {
    throw new Error("Mes inválido. Debe estar entre 1 y 12.");
  }

  const tabla = `datosdataloger.datocrudodatalogerm${mes}`;
  const campo_fecha = `datocruddatam${mes}_fecha`;
  const campo_valor = `datocruddatam${mes}_valor`;

  let query = `
    SELECT 
      e.esta_id,
      e.esta_nombre,
      s.sens_id,
      s.sens_nombre,
      s.sens_modelo,
      s.sens_estado,
      m.marc_nombre AS marca,
      vd.varidata_id,
      vd.varidata_nombre,
      d.${campo_valor} AS valor_dataloger,
      d.${campo_fecha} AS fecha_dataloger
    FROM ${tabla} d
    JOIN administracion.estacion e ON d.esta_id = e.esta_id
    JOIN administracion.sensores s ON s.sens_id = d.sens_id
    LEFT JOIN administracion.marca m ON s.marc_id = m.marc_id
    JOIN administracion.sens_varidata svd ON svd.sens_id = s.sens_id AND svd.varidata_id = d.varidata_id
    JOIN administracion.variabledataloger vd ON vd.varidata_id = svd.varidata_id
    WHERE d.${campo_fecha} BETWEEN $1 AND $2
      AND vd.varidata_nombre ILIKE '%promedio%'
  `;

  const params = [fechaInicio, fechaFin];

  if (esta_id) {
    query += ` AND d.esta_id = $3`;
    params.push(esta_id);
  }

  query += ` ORDER BY e.esta_id, s.sens_id, d.${campo_fecha}`;

  const result = await db.query(query, params);
  return result.rows;
};

module.exports = { getDataloggerData };
