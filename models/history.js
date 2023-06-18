const mongoose = require("mongoose");
const { NUMBER } = require("sequelize");
const freelancer = require("./freelancer.user.model");

const Schema = mongoose.Schema;
const History = new Schema({
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: freelancer,
        required: true,
    },
     hired:{
        type: String,
        required :true
    },
    worked_for : {
        type: String,
        required :true
    },
    salary : {
        type: Number,
        required :true
    }
});
module.exports = mongoose.model("history", History);