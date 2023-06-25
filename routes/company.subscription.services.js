const express = require('express');
const router = express.Router();
const subsServices = require('../models/comapany.subs.services');

router.post('/addSubs', async (req, res)=> {
const {name, listingCompany, sliverPlan, goldPlan, platinumPlan, details} = req.body;
if(!name || !listingCompany || !sliverPlan || !goldPlan || !platinumPlan || !details) {
return res.status(400).json({message: "Missing Required Fields.", success: false});
}
try {
  const sub = await subsServices.findOne({name: name, listingCompany: listingCompany});
  if(sub){
    return res.status(400).json({message: "Service for company Already exists", success: true});
  }
    const addSubs = new subsServices({name, listingCompany, sliverPlan, goldPlan, platinumPlan, details});
addSubs.save().then(()=> {
return res.status(201).json({ message: 'Subscription Paln added successfully.', success: true});
}).catch(error=> {
    return res.status(400).json({message: error.message, success: false});
});
} catch (error) {
    res.status(500).json({ message: "An error occurred.", success: false, error: error.message });
}
});

router.get('/allSubs/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const subs = await subsServices.find({ listingCompany: id }).populate('listingCompany');
      if (!subs) {
        return res.status(400).json({ message: "Not Found", success: false });
      }
      const listingCompany = subs[0].listingCompany; 
      const mergedSubs = { ...subs[0]._doc, ...listingCompany._doc };
      delete mergedSubs.listingCompany;
  
      return res.status(201).send(mergedSubs);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred.", success: false, error: error.message });
    }
  });
  
  router.get('/allSubs', async (req, res) => {
    try {
      const subs = await subsServices.find({}).populate('listingCompany');
      if (!subs) {
        return res.status(400).json({ message: "Not Found", success: false });
      }
      const listingCompany = subs[0].listingCompany; 
      const mergedSubs = { ...subs[0]._doc, ...listingCompany._doc };
      delete mergedSubs.listingCompany;
  
      return res.status(201).send(mergedSubs);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred.", success: false, error: error.message });
    }
  })
router.delete('/deleteSubs/:id', async (req, res)=> {
const id =req.params.id;
try {
    const deleteSub = await subsServices.findByIdAndDelete({_id: id});
if(!deleteSub){
    return res.status(400).json({message: "Error Occured", success: false});
}
return res.status(201).json({ message: 'Successfully Deleted', success: true});
} catch (error) {
    return res.status(500).json({ message: "An error occurred.", success: false, error: error.message });
  }
});
module.exports = router;