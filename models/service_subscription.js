const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const service_subscriptionSchema = new mongoose.Schema({
    // service_image: {
    //     type: String, // Assuming we will store the image file path or URL as a string
    //     required: true
    // },
    service_name: {
        type: String,
        required: true
    },
    service_description: {
        type: String,
        required: true
    },
    service_price: {
        type: Number,
        required: true
    },
    service_type: {
        type: String,
        required: true,
        enum: ['monthly', 'annual'],
        default: 'months'
    }

});


module.exports = mongoose.model('service_subscription', service_subscriptionSchema);