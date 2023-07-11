const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanyUser = Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "please enter valid email address",
    },
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const phoneRegex = /^98\d{8}$/;
        const landRegex = /^061\d{9}$/;
        if((phoneRegex.test(value) || landRegex.test(value)))
        {return;}
      },
      message: 'Invalid phone number format',
    },
  },
  role: {
    type: String,
    default: "C"
  }
});

module.exports = mongoose.model("CompanyUser", CompanyUser);