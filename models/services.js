const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const company = require('./about.company');

// Service Schema
const serviceSchema = new Schema({
   lister: {
    type: Schema.Types.ObjectId,
    ref: company,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  silver: {
    type: Number,
    required: true
  },
  gold: {
    type: Number,
    required: true
  },
  platinum: {
    type: Number,
    required: true
  },
  features: {
    type: [String],
    required: true
  }
 
});

// Create and export the Service model
const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
