const mongoose = require('mongoose');
const freelancer = require('./freelancer.profile.model')
const servSchema = new mongoose.Schema({
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: freelancer },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  deliveryTime: { type: Number, required: true },
  categories: [{ type: String }],
  tags: [{ type: String }],
  images: [{ type: String }],
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('ServSchema', servSchema);