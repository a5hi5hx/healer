 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 //const Services = require('./services.model');
 const AboutCompany = Schema({
companyName: {
    type: String,
    required: true,
    unique: true,
},
companyCategory: {
    type: String,
    required: true,
},
companyRating: {
    type: Number,
     required: true,
},
companyDetails: {
    type: String,
    required: true,
},
companyLogo: {
    type: String,
    required: true,
},
// companyServices: [{
//     type: Schema.Types.ObjectId,
//     ref: Services,
//     required: true,
//   }],
 });
 module.exports = mongoose.model('AboutCompany', AboutCompany);