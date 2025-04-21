const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ดึง User ทั้งหมด
router.get('/', userController.getAllUsers);

// ดึง User ตาม id
router.get('/:id', userController.getUserById);

// เซฟโพสต์
router.post('/:userId/savePost', userController.savePost);

// ดึงโพสต์ที่บันทึกไว้
router.get('/:userId/savedPosts', userController.getSavedPosts);

// 🔥 ยกเลิกบันทึกโพสต์
router.post('/:userId/unsavePost', userController.unsavePost);  // <<<<< เพิ่มบรรทัดนี้


module.exports = router;
