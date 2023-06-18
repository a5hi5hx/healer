const express = require('express');
const router = express.Router();
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
// const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const otpsave = require('../models/otp.model');
const User = require('../models/user.model');
app.use(bodyParser.json());

async function sendOTPByEmail(email, otp)  {
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
        console.log('Email sent: ' + info.response);
      }
    });
  }
  
//   router.post('/send', async (req, res) => {
//     const { email } = req.body;
//     if(!email){
//         return res.status(400).json({messaeg: "email is required", succes: false});
//     }
//     try{
//         const user = otpsave.find({email: email});
//         if(user){
//             console.log(user);
//             const otp = otpGenerator.generate(10, { digits: true, alphabets: false, upperCase: false, specialChars: false });
//             const expiryTimestamp = Date.now() + 5 * 60 * 1000;
//             user.otp = otp;
//             user.expiryDate = expiryTimestamp;
//             await sendOTPByEmail(email, otp);
//             await user.save();
//             return res.status(200).json({ message: 'OTP sent successfully.', success: true});
//         }
//         else{
//             const otp = otpGenerator.generate(10, { digits: true, alphabets: false, upperCase: false, specialChars: false });
//             const expiryTimestamp = Date.now() + 5 * 60 * 1000;
//                 const data = new otpsave({
//                     email, otp, expiryDate: expiryTimestamp, 
//                 });
//               await sendOTPByEmail(email, otp);
//               await data.Save();
//             res.json({ message: 'OTP sent successfully.', success: true});
//         }
//     }catch(error){
//         console.log(error);
//         return res.status(500).json({message: "Some error occured.", success: false});
//     }
   
//   });
router.post('/send', async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required", success: false });
    }
    try {
      const user = await otpsave.findOne({ email: email });
      if (user) {
        //const otp = otpGenerator.generate(4, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        generateOtp = function () {
          const zeros = '0'.repeat(3);
          const x = parseFloat('1' + zeros);
          const y = parseFloat('9' + zeros);
          const confirmationCode = (Math.floor(x + Math.random() * y));
       return confirmationCode;
      }
     const otp = generateOtp();
        const expiryTimestamp = Date.now() + 5 * 60 * 1000;
        user.otp = otp;
        user.expiryDate = expiryTimestamp;
        await sendOTPByEmail(email, otp);
        await user.save();
        return res.status(200).json({ message: 'OTP sent successfully.', success: true });
      } else {
        const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        const expiryTimestamp = Date.now() + 5 * 60 * 1000;
        const data = new otpsave({
          email,
          otp,
          expiryDate: expiryTimestamp.toString(),
        });
        await sendOTPByEmail(email, otp);
        await data.save();
        return res.json({ message: 'OTP sent successfully.', success: true });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Some error occurred.", success: false });
    }
  });
  
//   router.post('/validate',async (req, res) => {
//     const { email, otp } = req.body;
//   const data = await otpsave.find({email: email});
//   if(!data){
//     return res.status(400).json({messaeg: "Not Signed Up. Use correct email.", succes: false});
//   }
//     if (Date.now() > data.expiryDate) {
        
//         if(data.otp == otp){
//            return res.status(200).json({ message: 'OTP is valid.', success: true});
//         }
//         else{
//             return res.status(400).json({ message: 'OTP is invalid.' , success: false});
//         }
//     } else {
//         return res.status(400).json({ message: 'Expired OTP', success:false });
//     }
//   });
router.post('/validate', async (req, res) => {
    const { email, otp } = req.body;
    const data = await otpsave.findOne({ email: email });
    if (!data) {
      return res.status(400).json({ message: "Not Signed Up. Use correct email.", success: false });
    }
    const currentDate = Date.now();
    const expiryDate = new Date(data.expiryDate).getTime();
    if (currentDate < expiryDate) {
      if (data.otp == otp) {
        await otpsave.deleteOne({ email: email });
          
        return res.status(200).json({ message: 'OTP is valid.', success: true });
      } else {
        return res.status(400).json({ message: 'OTP is invalid.', success: false });
      }
    } else {
      return res.status(400).json({ message: 'Expired OTP', success: false });
    }
  });

  router.post('/verifyUser', async (req, res) => {
    const { email, otp } = req.body;
   try{ const user = await User.findOne({ email });
if (user.isVerified == false) {
  user.isVerified = true;
  await user.save();
  return res.status(200).json({ message: 'User Verified', success: true });
}
else if (user.isVerified == true) {
  return res.status(200).json({ message: 'User Already Verified', success: false });
}

return res.status(400).json({ message: 'Error try again', success: false });
 
}catch(error){
  return res.status(500).json({ message: "Some error occurred.", success: false });
}

  });
  module.exports = router;
