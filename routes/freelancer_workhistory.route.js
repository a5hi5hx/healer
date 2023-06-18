const express = require('express');
const router = express.Router();
const workhistory = require('../models/freelancer.workhistory.model');

router.post('/addwork', async (req, res)=> {
const {total_earning, total_jobs, work_history} = req.body;
if(!total_earning || !total_jobs || !work_history) {
return res.status(400).json({message: "Missing Required Fields.", success: false});
}
try {
    const addSubs = new workhistory({total_earning, total_jobs, work_history});
addSubs.save().then(()=> {
return res.status(201).json({ message: 'Data added successfully.', success: true});
}).catch(error=> {
    return res.status(400).json({message: error.message, success: false});
});
} catch (error) {
    res.status(500).json({ message: "An error occurred.", success: false, error: error.message });
}
});

router.get("/allwork", async (req, res) => {
    try{
        const ser = await Service.find();
        if(ser){
            return res.status(201).json(ser);
        }
        else{
            return res.status(404).send("No History Found");
        }
    }catch(error){
      console.error(error);
    res.status(500).json({ message: "Server Error",  success: false});
    }
  });
  
  
router.delete('/deleteWork/:id', async (req, res)=> {
const id =req.params.id;
try {
    const deleteSub = await workhistory.findByIdAndDelete({_id: id});
if(!deleteSub){
    return res.status(400).json({message: "Error Occured", success: false});
}
return res.status(201).json({ message: 'Successfully Deleted', success: true});
} catch (error) {
    return res.status(500).json({ message: "An error occurred.", success: false, error: error.message });
  }
});
module.exports = router;