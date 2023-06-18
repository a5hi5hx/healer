 const express = require('express');
const router = express.Router();
const freelancerDesc = require('../models/freelancer.desc');
const Freelancer =require("../models/freelancer.profile.model");

router.post('/adddescription', async (req, res) => {
  try {
    const { _id, description, strength, skills, experiencedescription,  } = req.body;
    
    const free = new freelancerDesc({
      _id,
        description,
        strength,
        skills,
        experiencedescription
      });
    await free.save();
    res.status(201).json({ message: 'Freelancer details saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

router.get('/viewdescription/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const free = await freelancerDesc.findById({_id: id});
    if (free) {
      res.status(200).json(free);
    } else {
      res.status(404).json({ error: 'No freelancer found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

// router.get('/views/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     const freelancerDescData = await freelancerDesc.findById(id);
//     const profiledata = await Freelancer.findById(id);

//     if (freelancerDescData && profiledata) {
//       const mergedData = {
//         _id: id,
//         freelancerDescData,
//         profiledata
//       };
//       res.status(200).json({mergedData });
//     } else {
//       res.status(404).json({ error: 'No freelancer found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error', error });
//   }
// });
// router.get('/views/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     const freelancerDescData = await freelancerDesc.findById({_id: id}).populate('_id');
//     if (freelancerDescData) {
// //       const frees = freelancerDescData[0].name;
// // const merge= { ...freelancerDescData[0]._doc, ...frees._doc};
// // delete merge.frees;
// //       res.status(200).json(merge);

//       res.status(200).json(freelancerDescData);
// } else {
//       res.status(404).json({ error: 'No freelancer found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error', error });
//   }
// });

router.get('/freelancerDesc/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const freelancerDescData = await freelancerDesc.findById(id).populate('_id');
    if (freelancerDescData) {
      const { _id, ...profile } = freelancerDescData._id.toObject();
      const mergedData = { ...freelancerDescData.toObject(), ...profile, _id };

      res.status(200).json(mergedData);
    } else {
      res.status(404).json({ error: 'No freelancer found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});





router.delete('/deletedescription/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await freelancerDesc.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.json({ message: 'Freelancer deleted' });
    } else {
      res.status(404).json({ error: 'Freelancer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

router.put('/updatedescription/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const freelancer = await freelancerDesc.findById(id);
    if (!freelancer) {
      res.status(404).json({ error: 'Freelancer not found' });
    } else {
      const {_id, description, strength, magictool, experiencedescription} = req.body;
      freelancer._id = _id || freelancer._id;
      freelancer.description = description || freelancer.description;
      freelancer.strength = strength || freelancer.strength;
      freelancer.skills = magictool || freelancer.magictool;
      freelancer.experiencedescription = experiencedescription || freelancer.experiencedescription;
      await freelancer.save();
      res.send(freelancer);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;
