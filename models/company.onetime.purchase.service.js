const mongoose = require('mongoose');
const Company = require('./about.company')
const Schema = mongoose.Schema;

const OneTimePurchasePlanCompany = new Schema({
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
  enum: ['Annual', 'Monthly']
},
details: {
    type: String,
    required: true,
  },
});
const OneTimePlan = mongoose.model('OneTimePurchasePlanCompany', OneTimePurchasePlanCompany);
module.exports= OneTimePlan;