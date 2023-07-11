const express = require('express');
const multer = require("multer");
const cloudinary = require("cloudinary");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Company = require('../models/about.company');
const cmp = require('../models/company.user.model');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

router.post('/addDetails',upload.single("image"), async (req, res)=> {
const {companyName, companyCategory, companyDetails, companyRating}=req.body;
const token = req.headers.authorization.split(' ')[1];

//const services = req.body.companyServices;
try {
  await jwt.verify(token, process.env.tokenSecret, (err, decoded) => {
    if (err) {
      // Handle token verification error
      return res.status(401).json({ error: 'Invalid token' });
    }
    const uid = decoded.id;
    if(!( Company.findOne({_id: uid})) && decoded.role !='C')
    {
        return res.status(400).json({message: "Anonymous User.", success: false});
    }
    if(!companyName || !companyCategory || !companyRating || !companyDetails)
{
    return res.status(400).json({message: "Missing Required Fields.", success: false});
}
var image = req.file;
if (!image) {
    return res.status(400).json({ msg: "image is required" });
  }

try {
  cloudinary.v2.uploader
      .upload_stream({ resource_type: "image" }, (err, result) => {
        if (result) {
            const comp = new Company({
                _id: uid, companyName, companyCategory,companyRating, companyDetails, companyLogo: result.url, 
        })
          comp
            .save()
            .then((cmp) => {
              res.status(201).json({ message: "Company Details Added Successfully.", success: true, ...cmp._doc });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({message: "Error Saving Company Details", success: false, error: err.message});
            });
        } else {
          res.status(500).json({ message: "Error Uploading Image", success: false, error: err.message });
        }
      })
      .end(image.buffer);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" , success: false, error: error.message});
  }
})}
catch (error) {
  console.log(error);
    res.status(500).json({ message: "An error occurred.", success: false, error: error.message });
}

});

router.get('/allcompanyDetails', async (req,res)=> {
try{
  const company = await Company.find();
//res.status(200).json({ message: "All Companies Details Fetched Successfully.", success: true, company });
if(company) {  return res.status(201).send(company);
}
else{
    return res.status(404).json({ message: "No Companies Details Found.", success: false });
}
}catch(error){
    return res.status(500).json({ message: "An error occurred.", success: false, error: error.message });
}
});


router.get('/companyDetails/:id', async (req, res) => {
    const companyId = req.params.id;
    try {
      const company = await Company.findById({_id: companyId});
      if (company) {
        res.status(200).json({ ...company._doc });
      } else {
        res.status(404).json({ message: 'Company Details Not Found.', success: false });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.', success: false, error: error.message });
    }
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
        if(!( cmp.findOne({_id: uid})) && decoded.role !='C')
        {
            return res.status(400).json({message: "Anonymous User.", success: false});
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
module.exports = router;