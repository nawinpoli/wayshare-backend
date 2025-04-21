const Comment = require('../models/Comment');

// GET ทั้งหมด หรือ ตาม postId
exports.getAllComments = async (req, res) => {
  try {
    const { postId } = req.query; // ดึง postId จาก query string
    let query = {};

    if (postId) {
      query.postId = postId; // ถ้ามี postId ก็กรอง
    }

    const comments = await Comment.find(query);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET comment ตาม id เดียว
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE comment
exports.createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;

    if (!postId || !content) {
      return res.status(400).json({ message: "Post ID และ Content จำเป็นต้องมี" });
    }

    const newComment = new Comment({
      postId,
      content,
      createdAt: new Date(), // เพิ่มเวลา comment ด้วย
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE comment
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE comment
exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
