const mongoose = require('mongoose');
const freelancer = require('./freelancer.user.model');
const freelancerSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: freelancer,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  rating : {
    type : String,
    required : true 
  },
  charge : {
    type : String,
    required : true 
  },
});

module.exports = mongoose.model('freelancer', freelancerSchema);
