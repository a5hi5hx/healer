const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Service = require('./services');
const BlogS = new Schema({
  titles: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true
  },
  sub_titles: [{
    type: String,
    required: true,
  }],
  content: [{
    type: String,
    required: true,
  }],
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: Service, // Reference the 'Service' model
    required: true,
  },
});

const Blog = mongoose.model('BlogS', BlogS);
module.exports = Blog;
