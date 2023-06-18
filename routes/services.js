const express = require('express');
const router = express.Router();
const Service = require('../models/services');

// POST /services
router.post('/addServices', async (req, res) => {
  try {
    const { lister, name, description, price, subscriptionPrice, features, planType } = req.body;

    // Create a new Service document
    const service = new Service({
      lister,
      name,
      description,
      price,
      subscriptionPrice,
      features,
      planType
    });

    // Save the Service to the database
    const savedService = await service.save();

    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the Service.' });
  }
});

module.exports = router;
