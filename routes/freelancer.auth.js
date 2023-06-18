const express = require('express');
const bcrypt = require('bcrypt');
const Freelancer = require('../models/freelancer.user.model');

const router = express.Router();

router.post('/fsignup', async (req, res)=> {
const {username, email, userpassword, phoneNumber} = req.body;
try {
    if(await Freelancer.findOne({email: email}) || await Freelancer.findOne({username: username}))
    {
        return res.status(400).json({message: "Freelancer already exists. Try resetting password.", success: false});
    }
const saltvalue = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
const salt = bcrypt.genSaltSync(saltvalue);
const password = await bcrypt.hashSync(userpassword, salt);
let usr = new Freelancer({
    username, email, password, phoneNumber
});
if(await usr.validate()){
    return res.status(400).json({message: "Validation Error. Try validating all fields first.", success: false});
} 
await usr.save()
  .then(() => {
    res.status(201).json({ message: "Freelancer created.", success: true});
  });
} catch (error) {
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

router.post('/flogin', async (req, res) => {
    const {username, userpassword} = req.body;

try {
    const user = await Freelancer.findOne({username: username});

    if(!user)
    {
        return res.status(400).json({message: "Freelancer doesn't exists. SignUp Now.", success: false});
    }
    bcrypt.compare(userpassword, user.password, function(err, result) {
      if (err) {
        return res.status(400).json({message: "Invalid Password.", success: false});
      }
      if (result) {
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

//admin panel for the management of freelancer so use of session or cookies predferred rather than authentication token

module.exports = router;