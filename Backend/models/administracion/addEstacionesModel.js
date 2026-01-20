const db = require('../../config/db');

const addEstacionesModel = {
  getAll: async () => {
    const result = await db.query(`
  SELECT e.*, t.tiposesta_nombre, p.prov_nombre, c.cant_nombre, parr.parr_nombre
  FROM administracion.estacion e
  JOIN administracion.tipoestacion t ON e.tipoesta_id = t.tipoesta_id
  JOIN administracion.parroquia parr ON e.parr_id = parr.parr_id
  JOIN administracion.canton c ON parr.cant_id = c.cant_id
  JOIN administracion.provincia p ON c.prov_id = p.prov_id
  ORDER BY e.esta_id
`);
    return result.rows;
  },

  getById: async (id) => {
    const result = await db.query(`
  SELECT e.*, t.tiposesta_nombre, p.prov_nombre, c.cant_nombre, parr.parr_nombre
  FROM administracion.estacion e
  JOIN administracion.tipoestacion t ON e.tipoesta_id = t.tipoesta_id
  JOIN administracion.parroquia parr ON e.parr_id = parr.parr_id
  JOIN administracion.canton c ON parr.cant_id = c.cant_id
  JOIN administracion.provincia p ON c.prov_id = p.prov_id
  WHERE e.esta_id = $1
`, [id]);
    return result.rows[0];
  },

create: async (data) => {
  const {
    esta_id,
    tipoesta_id, parr_id, esta_nombre, esta_ubicacion,
    esta_latitud, esta_longitud, esta_alturaterreno,
    esta_promotorterreno, esta_propietarioinstitucion,
    esta_institucionacargo, esta_manualautomatica,
    esta_codigoinamhi, esta_path, esta_comunidad,
    esta_nombrearchivo, esta_path_leidos
  } = data;

  // Validar si ya existe
  const exists = await addEstacionesModel.getByEstacionId(esta_id);
  if (exists) {
    throw new Error(`El ID ${esta_id} ya está en uso. Usa otro ID.`);
  }

  const result = await db.query(`
    INSERT INTO administracion.estacion (
      esta_id, tipoesta_id, parr_id, esta_nombre, esta_ubicacion,
      esta_latitud, esta_longitud, esta_alturaterreno,
      esta_promotorterreno, esta_propietarioinstitucion,
      esta_institucionacargo, esta_manualautomatica,
      esta_codigoinamhi, esta_path, esta_comunidad,
      esta_nombrearchivo, esta_path_leidos
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8,
      $9, $10,
      $11, $12,
      $13, $14, $15,
      $16, $17
    )
    RETURNING esta_id
  `, [
    esta_id, tipoesta_id, parr_id, esta_nombre, esta_ubicacion,
    esta_latitud, esta_longitud, esta_alturaterreno,
    esta_promotorterreno, esta_propietarioinstitucion,
    esta_institucionacargo, esta_manualautomatica,
    esta_codigoinamhi, esta_path, esta_comunidad,
    esta_nombrearchivo, esta_path_leidos
  ]);

  return result.rows[0].esta_id;
},

  update: async (id, data) => {
    const {
      tipoesta_id, parr_id, esta_nombre, esta_ubicacion,
      esta_latitud, esta_longitud, esta_alturaterreno,
      esta_promotorterreno, esta_propietarioinstitucion,
      esta_institucionacargo, esta_manualautomatica,
      esta_codigoinamhi, esta_path, esta_comunidad,
      esta_nombrearchivo, esta_path_leidos
    } = data;

    const result = await db.query(`
      UPDATE administracion.estacion SET
        tipoesta_id = $1,
        parr_id = $2,
        esta_nombre = $3,
        esta_ubicacion = $4,
        esta_latitud = $5,
        esta_longitud = $6,
        esta_alturaterreno = $7,
        esta_promotorterreno = $8,
        esta_propietarioinstitucion = $9,
        esta_institucionacargo = $10,
        esta_manualautomatica = $11,
        esta_codigoinamhi = $12,
        esta_path = $13,
        esta_comunidad = $14,
        esta_nombrearchivo = $15,
        esta_path_leidos = $16
      WHERE esta_id = $17
    `, [
      tipoesta_id, parr_id, esta_nombre, esta_ubicacion,
      esta_latitud, esta_longitud, esta_alturaterreno,
      esta_promotorterreno, esta_propietarioinstitucion,
      esta_institucionacargo, esta_manualautomatica,
      esta_codigoinamhi, esta_path, esta_comunidad,
      esta_nombrearchivo, esta_path_leidos, id
    ]);

    return result.rowCount;
  },

  delete: async (id) => {
    const result = await db.query('DELETE FROM administracion.estacion WHERE esta_id = $1', [id]);
    return result.rowCount;
  },

getByIdOrNombre: async (searchTerm) => {
  const result = await db.query(`
    SELECT e.*, t.tiposesta_nombre, p.prov_nombre, c.cant_nombre, parr.parr_nombre
    FROM administracion.estacion e
    JOIN administracion.tipoestacion t ON e.tipoesta_id = t.tipoesta_id
    JOIN administracion.parroquia parr ON e.parr_id = parr.parr_id
    JOIN administracion.canton c ON parr.cant_id = c.cant_id
    JOIN administracion.provincia p ON c.prov_id = p.prov_id
    WHERE CAST(e.esta_id AS TEXT) = $1 OR LOWER(e.esta_nombre) LIKE LOWER('%' || $1 || '%')
  `, [searchTerm]);
  return result.rows;
},



  getByEstacionId: async (esta_id) => {
  const result = await db.query(
    `SELECT esta_id FROM administracion.estacion WHERE esta_id = $1`,
    [esta_id]
  );
  return result.rows.length > 0;
}

};

module.exports = addEstacionesModel;
