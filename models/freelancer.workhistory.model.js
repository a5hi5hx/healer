const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const workHistory = new Schema({
    total_earning:{
        type: Number,
        default: 0
    },
    total_jobs : {
        type: Number,
        default: 0
    },
    work_history:{
        type: Array,
        default: []
    }
});
module.exports = mongoose.model("work_history", workHistory);