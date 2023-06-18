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
  price: {
type: Number,
required: function () {
  return this.planType === 'one-time';
}
  },
  subscriptionPrice: {
    silver: {
      type: Number,
      required: function () {
        return this.planType === 'subscription';
      }
    },
    gold: {
      type: Number,
      required: function () {
        return this.planType === 'subscription';
      }
    },
    platinum: {
      type: Number,
      required: function () {
        return this.planType === 'subscription';
      }
    }
  },
  features: {
    type: [String],
    required: true
  },
  planType: {
    type: String,
    enum: ['one-time', 'subscription'],
    required: true
  },
 
});

// Create and export the Service model
const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
