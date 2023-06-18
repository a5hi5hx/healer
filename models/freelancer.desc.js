const mongoose = require('mongoose');
const freelancer = require('./freelancer.profile.model');
const freelancerDescSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:freelancer,
    required: true,
  },
  description : {
    type : String,
    required : true
  },
  strength: [{
    type: String,
    required : true
  }],
  magicTools: [{
    type : String,
    required : true
  }],
  experiencedescription: [{
    type : String,
    required : true
  }],
  });

module.exports = mongoose.model('freelancerDesc', freelancerDescSchema);
