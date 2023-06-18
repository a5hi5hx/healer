const express = require('express');
const router = express.Router();
const OneTimePurchasePlanCompany = require('../models/company.onetime.purchase.service');


router.post('/oneTimePurchase', async (req, res) => {
  try {
    const { name, listingCompany, cost, type, details } = req.body;
    if (!name || !listingCompany || !cost || !type || !details) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newOneTimePurchasePlanCompany = new OneTimePurchasePlanCompany({
      name,
      listingCompany,
      cost,
      type,
      details,
    });
    await newOneTimePurchasePlanCompany.save();
    return res.status(201).json(newOneTimePurchasePlanCompany);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
