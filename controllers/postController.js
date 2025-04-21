const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
};

exports.deleteAllPosts = async (req, res) => {
  try {
    await Post.deleteMany({});
    res.status(200).json({ message: "ลบโพสต์ทั้งหมดเรียบร้อยแล้ว" });
  } catch (error) {
    console.error("Error deleting posts:", error.message);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการลบโพสต์ทั้งหมด" });
  }
};

exports.createPost = async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).json(post);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
};
