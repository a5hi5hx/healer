const mongoose = require('mongoose');
const Company = require('./about.company');
const Schema = mongoose.Schema;

const ServicesasSubscription = new Schema({
  name: {
    type: String,
    required: true,
  },
  listingCompany: {
    type: Schema.Types.ObjectId,
    ref: Company,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  type: {
  type: String,
  reuired: true,
  enum: ['annual', 'monthly'],
  },
  details: {
    type: String,
    required: true,
  },
});

module.exports= mongoose.exports('ServicesasSubscription', ServicesasSubscription);