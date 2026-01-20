const db = require('../config/db');

const perfilController = {
    getPerfil: async (req, res) => {
        const userId = req.user.id;

        try {
            const result = await db.query(
                'SELECT nombre, apellido, correo, rol, foto FROM administracion.usuarios WHERE id_usuario = $1',
                [userId]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const usuario = result.rows[0];
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
        }
    }
};

module.exports = perfilController;
