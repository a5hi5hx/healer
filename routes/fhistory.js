const express = require('express');
const router = express.Router();
const fhistory = require('../models/history');

router.post('/addhistory', async (req, res)=> {
    try{
    const { hired , worked_for, freelancer} = req.body;
    const fhi = new fhistory({
      freelancerId,
      hired,
      worked_for
      });
    await fhi.save();
    res.status(201).json({ message: 'History saved successfully' });
    }
   catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
});

router.get("/allhistory", async (req, res) => {
    try{
        const fhi = await fhistory.find();
        if(fhi){
            return res.status(201).json(fhi);
        }
        else{
            return res.status(404).send("No History Found");
        }
    }catch(error){
      console.error(error);
    res.status(500).json({ message: "Server Error",  success: false});
    }
  });
  
  
router.delete('/deletehistory/:id', async (req, res)=> {
    try {
        const id = req.params.id;
        const fhi = await fhistory.deleteOne({ _id: id });
        if (fhi.deletedCount === 1) {
          res.json({ message: 'history detleted' });
        } else {
          res.status(404).json({ error: 'history  not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error });
      }
    });
module.exports = router;