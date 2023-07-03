const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const router = express.Router();
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const otpsave = require('../models/otp.model');
const cloudinary = require("cloudinary");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

async function sendOTPByEmail(email)  {
  generateOtp = function () {
    const zeros = '0'.repeat(3);
    const x = parseFloat('1' + zeros);
    const y = parseFloat('9' + zeros);
    const confirmationCode = (Math.floor(x + Math.random() * y));
 return confirmationCode;
}
const otp = generateOtp();
  const expiryTimestamp = Date.now() + 5 * 60 * 1000;
  const data = new otpsave({
    email,
    otp,
    expiryDate: expiryTimestamp.toString(),
  });
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.otp_email,
      pass: process.env.otp_pass,
    },
  });
  const mailOptions = {
    from: process.env.otp_email,
    to: email,
    subject: 'OTP Verification',
    html: `<h3>Your OTP is<h2> ${otp}</h2>. Valid for 5 minutes. Please use it to verify your account.</h3>`,
  };
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
       data.save();
      console.log('Email sent: ' + info.response);
    }
  });
}
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.route("/signup").post( async (req, res) => {
const {username, email, password, phoneNumber} = req.body;
try {
    if(await User.findOne({email: email}) || await User.findOne({username: username}))
    {
        return res.status(400).json({message: "User already exists. Try resetting password.", success: false});
    }
// const saltvalue = await Math.floor(Math.random() * (20 - 10 + 1)) + 10;
// const salt = await bcrypt.genSaltSync(saltvalue);
// const encpassword = await bcrypt.hashSync(password, salt);
// let usr = new User({
//     username, email, password: encpassword, phoneNumber
// });

const saltvalue = await Math.floor(Math.random() * (20 - 10 + 1)) + 10;
const salt =  await bcrypt.genSaltSync(saltvalue);
const encpassword =  await bcrypt.hashSync(password, salt);

// const rs = await cloudinary.v2.uploader
// .upload_stream({ resource_type: "image" }, (error, result) => {
//   if (result) {
  
// const encpassword =  bcrypt.hashSync(password, salt);
    // Save user to MongoDB
    let usr = new User({
      username, email, password: encpassword, phoneNumber
  });
  if(await usr.validate()){
    return res.status(400).json({message: "Validation Error. Try validating all fields first.", success: false});
}
  usr.save()
      .then(() => {
            const token = jwt.sign({ id: usr._id, role:usr.role }, process.env.tokenSecret);
        sendOTPByEmail(email);
    delete usr._doc.password;
            res.status(201).json({ message: "User created.", success: true ,usr, token: token});
          })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: "Error saving user" });
      });
      
// await usr.save()
//   .then(() => {
//     const token = jwt.sign({ id: usr._id }, process.env.tokenSecret);
// sendOTPByEmail(email);
//     res.status(201).json({ message: "User created.", success: true , token: token});
//   })
//   .catch((error) => {
//     res.status(400).json({ message: "User Creation error", success: false, error: error });
//   });
  // }}).end(image.buffer);
} catch (error) {
  console.log(error);
    if (error.name === 'ValidationError') {
        if (error.errors.phoneNumber && error.errors.phoneNumber.kind === 'regexp') {
          return res
            .status(400)
            .json({ message: "Invalid phone number format.", success: false });
        }
        if (error.errors.email && error.errors.email.kind === 'regexp') {
            return res
              .status(400)
              .json({ message: "Please enter a valid email address.", success: false });
          }
      }
      
      res.status(500).json({ message: "An error occurred.", success: false, error: error.message });
    }

});


router.post('/login', async (req, res) => {
    const {username, userpassword} = req.body;
try {
    const user = await User.findOne({username: username});

    if(!user)
    {
        return res.status(400).json({message: "User doesn't exists. SignUp Now.", success: false});
    }
    if(user.isVerified == false)
    {
      return res.status(400).json({message: "User not verified", success: false});

    }
    bcrypt.compare(userpassword, user.password, function(err, result) {
      if (err) {
        return res.status(400).json({message: "Invalid Password.", success: false});
      }
      if (result) {
        const token = jwt.sign({ id: user._id, role: user.role}, 'somesecretkey');
        delete user._doc.password;

        return res.status(201).json({message: "valid Password.", success: true, token: token, ...user._doc});
      } else {
        return res.status(400).json({message: "Invalid Password.", success: false});
      }
    });
} catch (error) {
    return res.status(500).json({message: "Some error occured.", success: false});
}
});


router.route("/tokenValid").get(async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) {
        return res.status(400).json({ msg: false , success: false});
      }
      const verified = jwt.verify(token, process.env.tokenSecret);
      if (!verified) {
        return res.status(400).json({ msg: false , success: false});
      }
      const user = await User.findById(verified.id);
      if (!user) {
        return res.status(400).json({ msg: false, success: false });
      }
      const { _id, username, email, password, phoneNumber, isVerified } = user._doc;
      return res.json({ msg: true, success: true, _id, username, email, password, phoneNumber, isVerified });
  
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
module.exports = router;