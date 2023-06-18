const express = require('express');
const router = express.Router();
const Company = require('../models/about.company');
const Service = require('../models/services');

router.post('/addservices', async (req, res) => {
  try {
    const { name, description, price, subscriptionPrice, duration, features, planType } = req.body;
    if ( !name, !description, !(price || subscriptionPrice), !duration, !features, !planType ){
      return res.status(400).json({message:"Missing Fields", success: false});
    }
    // Create a new service document
    const service = new Service({
      name,
      description,
      price, 
      subscriptionPrice,
      duration,
      features,
      planType,   
    });

    // Save the service to the database
    await service.save();

    res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating service', error });
  }
});

module.exports = router;
