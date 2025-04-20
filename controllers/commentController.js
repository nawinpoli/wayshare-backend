const Comment = require('../models/Comment');

exports.getAllComments = async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
};

exports.getCommentById = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  res.json(comment);
};

exports.createComment = async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.status(201).json(comment);
};

exports.updateComment = async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(comment);
};

exports.deleteComment = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Comment deleted' });
};
