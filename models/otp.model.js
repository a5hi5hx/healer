const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OtpModel = new Schema({
    email: {
        type: String,
        required: true,
    },
otp: {
type: String,
required: true,
},
expiryDate: {
    type: Date,
    required: true,
}
});

module.exports=mongoose.model('OtpModel', OtpModel);