const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const company = require('./about.company');
const services = require('./services');
const user = require('./user.model');

const performaInvoiceSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: services,
    required: true
  },
  planType: {
    type: String,
    enum: ['one-time', 'subscription'],
    required: true
  },
  planCategory: {
    type: String,
    enum: ['sliver', 'gold', 'platinum'],
    required: function () {
      return this.planType === 'subscription';
    }
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: company,
    requred: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: user,
    required: true
  },
  expectedAmount: {
    type: Number,
    required: true
  },
});



const PerformaInvoice = mongoose.model('PerformaInvoice', performaInvoiceSchema);
module.exports = PerformaInvoice;
