 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 const company = require('./company.user.model');
 //const Services = require('./services.model');
 const AboutCompany = Schema({
    _id:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'company'
    },
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
    default: "https://res.cloudinary.com/djq37xptm/image/upload/v1677953696/i02sxwh0mn1biz6ivgiu.jpg"
},
// companyServices: [{
//     type: Schema.Types.ObjectId,
//     ref: Services,
//     required: true,
//   }],
 });
 module.exports = mongoose.model('AboutCompany', AboutCompany);