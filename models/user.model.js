const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = Schema({
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
        return phoneRegex.test(value);
      },
      message: 'Invalid phone number format',
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  image: {
   type: String,
   default:"https://res.cloudinary.com/djq37xptm/image/upload/v1677953696/i02sxwh0mn1biz6ivgiu.jpg",
  }
});

module.exports = mongoose.model("User", User);