const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ดึง User ทั้งหมด
router.get('/', userController.getAllUsers);

// ดึง User ตาม id
router.get('/:id', userController.getUserById);

// ✅ เซฟโพสต์
router.post('/:userId/savePost', userController.savePost);

module.exports = router;
