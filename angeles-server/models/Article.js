const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  paragraphs: { type: Number, default: 0 },
  preview: { type: String },
  content: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);