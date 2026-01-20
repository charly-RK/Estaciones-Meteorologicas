const db = require('../../config/db');

const getAllData = async () => {
  const query = `
    SELECT DISTINCT
        e.esta_id,
        e.esta_nombre,
        s.sens_id,
        s.sens_nombre,
        s.sens_modelo,
        s.sens_estado,
        m.marc_nombre AS marca,
        vd.varidata_id,
        vd.varidata_nombre,
        dd.valor_dataloger,
        dd.fecha_dataloger
    FROM administracion.estacion e
    JOIN administracion.sensores s ON s.esta_id = e.esta_id
    LEFT JOIN administracion.marca m ON s.marc_id = m.marc_id
    LEFT JOIN administracion.sens_varidata svd ON svd.sens_id = s.sens_id
    LEFT JOIN administracion.variabledataloger vd ON vd.varidata_id = svd.varidata_id
    LEFT JOIN LATERAL (
        SELECT 
            dd1.datocruddatam1_valor AS valor_dataloger,
            dd1.datocruddatam1_fecha AS fecha_dataloger
        FROM datosdataloger.datocrudodatalogerm1 dd1
        WHERE dd1.sens_id = s.sens_id 
          AND dd1.varidata_id = vd.varidata_id
        ORDER BY dd1.datocruddatam1_fecha DESC, dd1.datocruddatam1_hora DESC
        LIMIT 1
    ) dd ON TRUE
    WHERE vd.varidata_nombre ILIKE '%promedio%'
    ORDER BY e.esta_id, s.sens_id
  `;
  const { rows } = await db.query(query);
  return rows;
};

const getById = async (id) => {
  const query = `
    SELECT DISTINCT
        e.esta_id,
        e.esta_nombre,
        s.sens_id,
        s.sens_nombre,
        s.sens_modelo,
        s.sens_estado,
        m.marc_nombre AS marca,
        vd.varidata_id,
        vd.varidata_nombre,
        dd.valor_dataloger,
        dd.fecha_dataloger
    FROM administracion.estacion e
    JOIN administracion.sensores s ON s.esta_id = e.esta_id
    LEFT JOIN administracion.marca m ON s.marc_id = m.marc_id
    LEFT JOIN administracion.sens_varidata svd ON svd.sens_id = s.sens_id
    LEFT JOIN administracion.variabledataloger vd ON vd.varidata_id = svd.varidata_id
    LEFT JOIN LATERAL (
        SELECT 
            dd1.datocruddatam1_valor AS valor_dataloger,
            dd1.datocruddatam1_fecha AS fecha_dataloger
        FROM datosdataloger.datocrudodatalogerm1 dd1
        WHERE dd1.sens_id = s.sens_id 
          AND dd1.varidata_id = vd.varidata_id
        ORDER BY dd1.datocruddatam1_fecha DESC, dd1.datocruddatam1_hora DESC
        LIMIT 1
    ) dd ON TRUE
    WHERE e.esta_id = $1 AND vd.varidata_nombre ILIKE '%promedio%'
    ORDER BY e.esta_id, s.sens_id
  `;
  const { rows } = await db.query(query, [id]);
  return rows;
};

const getByDateRange = async (startDate, endDate) => {
  const query = `
    SELECT DISTINCT
        e.esta_id,
        e.esta_nombre,
        s.sens_id,
        s.sens_nombre,
        s.sens_modelo,
        s.sens_estado,
        m.marc_nombre AS marca,
        vd.varidata_id,
        vd.varidata_nombre,
        dd.valor_dataloger,
        dd.fecha_dataloger
    FROM administracion.estacion e
    JOIN administracion.sensores s ON s.esta_id = e.esta_id
    LEFT JOIN administracion.marca m ON s.marc_id = m.marc_id
    LEFT JOIN administracion.sens_varidata svd ON svd.sens_id = s.sens_id
    LEFT JOIN administracion.variabledataloger vd ON vd.varidata_id = svd.varidata_id
    LEFT JOIN LATERAL (
        SELECT 
            dd1.datocruddatam1_valor AS valor_dataloger,
            dd1.datocruddatam1_fecha AS fecha_dataloger
        FROM datosdataloger.datocrudodatalogerm1 dd1
        WHERE dd1.sens_id = s.sens_id 
          AND dd1.varidata_id = vd.varidata_id
          AND dd1.datocruddatam1_fecha BETWEEN $1 AND $2
        ORDER BY dd1.datocruddatam1_fecha DESC, dd1.datocruddatam1_hora DESC
        LIMIT 1
    ) dd ON TRUE
    WHERE vd.varidata_nombre ILIKE '%promedio%'
    ORDER BY e.esta_id, s.sens_id
  `;
  const { rows } = await db.query(query, [startDate, endDate]);
  return rows;
};

const getDataFiltered = async (startDate, endDate, estaId) => {
  const query = `
    SELECT DISTINCT
      e.esta_id,
      e.esta_nombre,
      s.sens_id,
      s.sens_nombre,
      s.sens_modelo,
      s.sens_estado,
      m.marc_nombre AS marca,
      vd.varidata_id,
      vd.varidata_nombre,
      dd.valor_dataloger,
      dd.fecha_dataloger
    FROM administracion.estacion e
    JOIN administracion.sensores s ON s.esta_id = e.esta_id
    LEFT JOIN administracion.marca m ON s.marc_id = m.marc_id
    LEFT JOIN administracion.sens_varidata svd ON svd.sens_id = s.sens_id
    LEFT JOIN administracion.variabledataloger vd ON vd.varidata_id = svd.varidata_id
    LEFT JOIN LATERAL (
      SELECT 
        dd1.datocruddatam1_valor AS valor_dataloger,
        dd1.datocruddatam1_fecha AS fecha_dataloger
      FROM datosdataloger.datocrudodatalogerm1 dd1
      WHERE dd1.sens_id = s.sens_id 
        AND dd1.varidata_id = vd.varidata_id
        AND dd1.datocruddatam1_fecha BETWEEN $1 AND $2
      ORDER BY dd1.datocruddatam1_fecha DESC, dd1.datocruddatam1_hora DESC
      LIMIT 1
    ) dd ON TRUE
    WHERE vd.varidata_nombre ILIKE '%promedio%'
      AND e.esta_id = $3
    ORDER BY e.esta_id, s.sens_id;
  `;

  const values = [startDate, endDate, estaId];

  try {
    const { rows } = await db.query(query, values);
    return rows;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getAllData,
  getById,
  getByDateRange,
  getDataFiltered,
};
