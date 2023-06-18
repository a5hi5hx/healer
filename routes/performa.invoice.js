const express = require('express');
const router = express.Router();
const fs = require('fs');


const Service = require('../models/services.js');
const comapany = require('../models/about.company');
const user = require('../models/user.model');
const performaInvoiceModel = require('../models/perfoma.invoice');

router.post('/genpreinvoice', async (req, res)=> {
const { user, service, planType, planCategory, expectedAmount} = req.body;
try{
    let listerDetails = (await Service.findById(service)).lister;
  console.log(listerDetails);
const performaInvoice = new performaInvoiceModel({
    company: listerDetails,
    service,
    planType,
    planCategory,
    user,
    expectedAmount
  });

  const savedPerformaInvoice = await performaInvoice.save();
writeErrorToFile(savedPerformaInvoice);
  res.status(201).json(savedPerformaInvoice);
} catch (error) {
    console.log(error);
    writeErrorToFile(error);
  res.status(500).json({ error: 'An error occurred while creating the PerformaInvoice.' });
}
});
// Function to write error to a file
const writeErrorToFile = (errorMessage) => {
    const fileName = 'error.log';
    const currentTime = new Date().toISOString();
  
    // Create the error message with timestamp
    const errorLog = `${currentTime}: ${errorMessage}\n`;
  
    // Write the error message to the file
    fs.appendFile(fileName, errorLog, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      }
    });
  };

// API endpoint to fetch all data from the performaInvoice collection
router.get('/performaInvoices', async (req, res) => {
  try {
    const performaInvoices = await performaInvoiceModel.find()
      .populate('company')
      .populate('service')
      .populate('user');
//remove unwanted fields left
    res.json([performaInvoices]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;
