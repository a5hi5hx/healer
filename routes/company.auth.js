const express = require('express');
const bcrypt = require('bcrypt');
const Company = require('../models/company.user.model');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/cSignup', async (req, res)=> {
const {username, email, userpassword, phoneNumber} = req.body;
try {
    if(await Company.findOne({email: email}) || await Company.findOne({username: username}))
    {
        return res.status(400).json({message: "Company already exists. Try resetting password.", success: false});
    }
const saltvalue = await Math.floor(Math.random() * (20 - 10 + 1)) + 10;
const salt = await bcrypt.genSaltSync(saltvalue);
const password = await bcrypt.hashSync(userpassword, salt);
let usr = new Company({
    username, email, password, phoneNumber
});
if(await usr.validate()){
    return res.status(400).json({message: "Validation Error. Try validating all fields first.", success: false});
} 
await usr.save()
  .then((u) => {
    const token = jwt.sign({ id: u._id, role: u.role}, 'somesecretkey');
    u._doc.token = token;
    delete u._doc.password;
    res.status(201).json({ message: "Company created.",u, success: true});
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

router.post('/cLogin', async (req, res) => {
    const {username, userpassword} = req.body;

try {
    const user = await Company.findOne({username: username});

    if(!user)
    {
        return res.status(400).json({message: "Company doesn't exists. SignUp Now.", success: false});
    }
    await bcrypt.compare(userpassword, user.password, function(err, result) {
      if (err) {
        return res.status(400).json({message: "Invalid Password.", success: false});
      }
      if (result) {
        const token = jwt.sign({ id: user._id, role: user.role}, 'somesecretkey');
        user._doc.token = token;
        delete user._doc.password;

        return res.status(201).json({message: "valid Password.", success: true, ...user._doc});
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
    const verified = jwt.verify(token, 'somesecretkey');
    if (!verified) {
      return res.status(400).json({ msg: false , success: false});
    }
    const user = await Company.findById(verified.id);
    if (!user) {
      return res.status(400).json({ msg: false, success: false });
    }
    delete user._doc.password;

    return res.json({ msg: true, success: true, ...user._doc });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
//admin panel for the management of freelancer so use of session or cookies predferred rather than authentication token

module.exports = router;