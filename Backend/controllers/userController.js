// controllers/userController.js
const User = require('../models/userModel');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = req.body;
            const result = await User.create(newUser);
            res.status(201).json({ message: 'Usuario creado', id: result.id });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getRecentUsers: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 5;
            const users = await User.findRecent(limit);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = userController;
