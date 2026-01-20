//controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const authController = {
    register: async (req, res) => {
        const { nombre, apellido, correo, contrasena, confirmarContrasena } = req.body;

        if (!nombre || !apellido || !correo || !contrasena || !confirmarContrasena) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const namePattern = /^[a-zA-Z\s]+$/;
        if (!namePattern.test(nombre) || !namePattern.test(apellido)) {
            return res.status(400).json({ message: 'El nombre y apellido no deben contener números' });
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(correo)) {
            return res.status(400).json({ message: 'Por favor ingrese un correo electrónico válido' });
        }

        if (contrasena !== confirmarContrasena) {
            return res.status(400).json({ message: 'Las contraseñas no coinciden' });
        }

        if (contrasena.length < 8) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
        }

        try {
            // Verificar si el usuario ya existe
            const existingUser = await db.query('SELECT * FROM administracion.usuarios WHERE correo = $1', [correo]);
            if (existingUser.rows.length > 0) {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }

            const hashedPassword = await bcrypt.hash(contrasena, 10);
            const rol = 'visitante';

            // Insertar usuario y devolver el ID
            const result = await db.query(
                'INSERT INTO administracion.usuarios (nombre, apellido, correo, contrasena, rol) VALUES ($1, $2, $3, $4, $5) RETURNING id_usuario',
                [nombre, apellido, correo, hashedPassword, rol]
            );

            res.status(201).json({ message: 'Usuario registrado exitosamente', id: result.rows[0].id_usuario });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        const { correo, contrasena } = req.body;

        try {
            const result = await db.query('SELECT * FROM administracion.usuarios WHERE correo = $1', [correo]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const user = result.rows[0];
            const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign(
                { id: user.id_usuario, rol: user.rol },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = authController;
