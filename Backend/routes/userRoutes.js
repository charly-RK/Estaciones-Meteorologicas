//routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

router.get('/recent', userController.getRecentUsers);

module.exports = router;
