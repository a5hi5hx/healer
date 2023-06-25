const mongoose = require('mongoose');
const Company = require('./about.company')
const Schema = mongoose.Schema;

const companySubscriptionServices = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  listingCompany: {
    type: Schema.Types.ObjectId,
    ref: Company,
    required: true,
  },
sliverPlan: {
    type: Number,
    required: true,
},
goldPlan: {
    type: Number,
    required: true,
},
platinumPlan: {
    type: Number,
    required: true,
},
details: {
    type: String,
    required: true,
  },
});

module.exports= mongoose.model('companySubscriptionServices', companySubscriptionServices);