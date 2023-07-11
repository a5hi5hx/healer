// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const user = require('./user.model');
// const service = require('./services');
// const subscriptionSchema = new Schema({
//   customerId: {
//     type: Schema.Types.ObjectId,
//     ref: user,
//     required: true
//   },
//   serviceId: {
//     type: Schema.Types.ObjectId,
//     ref: service,
//     required: true
//   },
//   plan: {
//     type: String,
//     enum: ['silver', 'gold', 'platinum'],
//     required: true
//   },
//   startDate: {
//     type: Date,
//     required: true
//   },
//   endDate: {
//     type: Date
//   },
//   status: {
//     type: String,
//     enum: ['active', 'canceled'],
//     default: 'active'
//   }
// });

// module.exports = mongoose.model('Subscription', subscriptionSchema);
