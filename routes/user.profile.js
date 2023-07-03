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
const JWT = require('../middlewares/authRole');

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  router.post('/imgUpload', upload.single("image"), async (req, res) => {
    const image = req.file;
    const token = req.headers.authorization.split(' ')[1];

    try {
     await jwt.verify(token, process.env.tokenSecret, (err, decoded) => {
        if (err) {
          // Handle token verification error
          return res.status(401).json({ error: 'Invalid token' });
        }
        const uid = decoded.id;
        if(!( User.findOne({_id: uid})))
        {
            return res.status(400).json({message: "User doesn't exists. Try sign up.", success: false});
        }
  
    const rs =  cloudinary.v2.uploader
    .upload_stream({ resource_type: "image" }, (error, result) => {
      if (result) {
        User.findByIdAndUpdate({_id: uid}, { image: result.url })
        .then(updatedUser => {
          console.log('Updated user:', updatedUser);
         delete updatedUser._doc.password
          res.status(201).json({ message: "User created.", success: true ,updatedUser});
        })
        .catch(err => {
          console.error('Error updating user:', err);
        });
          
  
      }}).end(image.buffer);
    })} catch (error) {
      console.log(error);
          res.status(500).json({ message: "An error occurred.", success: false, error: error.message });
        }
    
    });
    
module.exports=router;