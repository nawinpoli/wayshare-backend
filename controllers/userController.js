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

  if (!user.savedPosts.includes(postId)) {
    user.savedPosts.push(postId);
    await user.save();
  }

  res.json({ message: "Post saved successfully" });
};

// 🆕 ดึง Saved Posts ของ User
exports.getSavedPosts = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('savedPosts');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.savedPosts);  // << เอาเฉพาะ savedPosts กลับไป
  } catch (error) {
    console.error('Error fetching saved posts:', error);
    res.status(500).json({ message: "Server error" });
  }
};
// 🔥 ลบโพสต์ที่บันทึกไว้
exports.unsavePost = async (req, res) => {
    const { userId } = req.params;
    const { postId } = req.body;
  
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
  
    // ลบ postId ออกจาก savedPosts
    user.savedPosts = user.savedPosts.filter(id => id.toString() !== postId);
    await user.save();
  
    res.json({ message: "Post unsaved successfully" });
  };
