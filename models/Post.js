const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  origin: String,
  destination: String,
  mainImage: String,
  galleryImages: [String],
  transportModes: [
    {
      type: { type: String },
      durationMinutes: Number,
      cost: Number
    }
  ],
  totalDuration: String,
  totalCost: Number,
  rating: {
    score: Number,
    text: String,
    reviewsCount: Number
  },
  // ✅ เพิ่มตรงนี้
  moreInfo: {
    type: String,
  }
});

module.exports = mongoose.model('Post', PostSchema);
