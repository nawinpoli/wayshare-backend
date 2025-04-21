const User = require('../models/User');

// ดึงข้อมูล User ทั้งหมด (สำหรับทดสอบ)
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// ดึงข้อมูล User ตาม ID
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).populate('savedPosts');
  res.json(user);
};

// ✅ บันทึก Post ที่เซฟโดย User
exports.savePost = async (req, res) => {
  const { userId } = req.params;
  const { postId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  // เช็คว่ามีโพสต์นี้อยู่แล้วไหม
  if (!user.savedPosts.includes(postId)) {
    user.savedPosts.push(postId);
    await user.save();
  }

  res.json({ message: "Post saved successfully" });
};
