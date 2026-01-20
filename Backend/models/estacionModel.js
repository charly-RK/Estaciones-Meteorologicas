const db = require('../config/db');

const EstacionModel = {
    getAll: async () => {
        const result = await db.query(`
            SELECT 
                e.esta_id,
                e.esta_nombre AS nombre_estacion,
                e.esta_ubicacion,
                e.esta_latitud,
                e.esta_longitud,
                e.esta_comunidad,
                e.esta_institucionacargo AS institucion_a_cargo,
                te.tiposesta_nombre AS tipo_estacion,
                p.parr_nombre AS parroquia,
                c.cant_nombre AS canton,
                pr.prov_nombre AS provincia,
                COUNT(s.sens_id) AS cantidad_sensores
            FROM administracion.estacion e
            JOIN administracion.tipoestacion te ON e.tipoesta_id = te.tipoesta_id
            LEFT JOIN administracion.parroquia p ON e.parr_id = p.parr_id
            LEFT JOIN administracion.canton c ON p.cant_id = c.cant_id
            LEFT JOIN administracion.provincia pr ON c.prov_id = pr.prov_id
            LEFT JOIN administracion.sensores s ON e.esta_id = s.esta_id
            GROUP BY 
                e.esta_id, e.esta_nombre, e.esta_ubicacion, e.esta_latitud, e.esta_longitud,
                e.esta_comunidad, e.esta_institucionacargo, te.tiposesta_nombre,
                p.parr_nombre, c.cant_nombre, pr.prov_nombre
            ORDER BY e.esta_id
        `);
        return result.rows;
    },

    getById: async (id) => {
        const result = await db.query(`
            SELECT 
                e.esta_id,
                e.esta_nombre AS nombre_estacion,
                e.esta_ubicacion,
                e.esta_latitud,
                e.esta_longitud,
                e.esta_comunidad,
                e.esta_institucionacargo AS institucion_a_cargo,
                te.tiposesta_nombre AS tipo_estacion,
                p.parr_nombre AS parroquia,
                c.cant_nombre AS canton,
                pr.prov_nombre AS provincia,
                COUNT(s.sens_id) AS cantidad_sensores
            FROM administracion.estacion e
            JOIN administracion.tipoestacion te ON e.tipoesta_id = te.tipoesta_id
            LEFT JOIN administracion.parroquia p ON e.parr_id = p.parr_id
            LEFT JOIN administracion.canton c ON p.cant_id = c.cant_id
            LEFT JOIN administracion.provincia pr ON c.prov_id = pr.prov_id
            LEFT JOIN administracion.sensores s ON e.esta_id = s.esta_id
            WHERE e.esta_id = $1
            GROUP BY 
                e.esta_id, e.esta_nombre, e.esta_ubicacion, e.esta_latitud, e.esta_longitud,
                e.esta_comunidad, e.esta_institucionacargo, te.tiposesta_nombre,
                p.parr_nombre, c.cant_nombre, pr.prov_nombre
        `, [id]);

        return result.rows[0];
    },

    getByIdOrNombre: async (searchTerm) => {
        const result = await db.query(`
            SELECT * FROM administracion.estacion 
            WHERE esta_id = $1 OR LOWER(esta_nombre) LIKE LOWER('%' || $1 || '%')
        `, [searchTerm]);
        return result.rows;
    },
};

module.exports = EstacionModel;
