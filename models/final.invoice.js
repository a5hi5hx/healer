const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const performaInvoice = require('./perfoma.invoice');

const finalInvoice = new Schema({
  performaInvoice: {
    type: Schema.Types.ObjectId,
    ref: performaInvoice,
    required: true
  },
  actualAmount: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  paymentDate: {
    type: Date,
    default: null
  }
});

module.exports =mongoose.model('FinalInvoice', finalInvoice);
