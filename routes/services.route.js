// const express = require('express');
// const router = express.Router();
// const Service= require('../models/service_subscription');

// router.post('/addservices', async (req, res) => {
//     try {
//       const {service_name, service_description, service_price, service_duration_type } = req.body;
//       if(!service_image || !service_name || !service_description || !service_price || !service_duration_type){
//         return res.status(401).json({message : "Missing Fields."});
//       }
//       const service = new Service({
       
//         service_name, 
//         service_description,
//         service_price,
//         service_duration_type
//       });
//       await service.save();
//       res.status(201).json({message: "Details Saved Successfully", success: true});
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server Error", error, success: false});
//     }

// });

// router.get("/viewservices", async (req, res) => {
//   try{
//       const ser = await Service.find();
//       if(ser){
//   return res.status(201).json(ser);
//       }
//       else{
//           return res.status(404).send("No Service Found");
//       }
//   }catch(error){
//     console.error(error);
//   res.status(500).json({ message: "Server Error", error});
//   }
// });


// router.patch("/updateservices/:id", async(req,res) =>{
//   try{
//     const _id =req.params.id;
//     const ser = await Service.findByIdAndUpdate(_id, req.body );
//     console.log(ser)
//     if(ser){
//      return res.status(201).json(ser);
//          }
//          else{
//              return res.status(404).send("Successfully Updated ");
//          }
//      }catch(error){
//        console.error(error);
//      res.status(400).json({ message: "Server Error", error});
//    }
// });


// router.delete("/deleteservices/:id",async (req,res)=>{
//   try{
//     const _id =req.params.id;
//     const ser = await Service.findByIdAndDelete(_id);
//     console.log(ser)
//     if(ser){
//      return res.status(201).json(ser);
//          }
//          else{
//              return res.status(404).send("No Students Found");
//          }
//      }catch(error){
//        console.error(error);
//      res.status(500).json({ message: "Server Error", error});
//    }
// });
// module.exports = router;