// const jwt = require('jsonwebtoken');
// const jwtSecret = "somesecretkey";
// const User = require('../models/user.model');
// require("dotenv").config();

// const JWT = {
//     capturer: async function (req, res, next) {
//         //non blocking middleware.. just runs on every request to see if jwt exists, and captures it if it does
//         try {
//           if (req.jwt === undefined) {
//             req.jwt = {
//               errors: [],
//               hasUser: function () {
//                 try {
//                   if (req.jwt.user._id) {
//                     return true;
//                   }
//                 } catch (err) {}
//                 return false;
//               },
//               // assign this role by default, any logged in user will have higher roles
//               userRole: "anonymous",
//             };
//           } else {
//             //if req.jwt has already been set, just skip this middleware. it should run only once
//             let e = "JWT instance already exists in request.";
//             req.jwt.errors.push(e);
//             throw new Error(e);
//           }
//           // console.log(req.jwt)
//           // next();
//           // return;
//           try {
//             req.jwt.token = req.headers.authorization.split(" ")[1];
//           } catch (err) {
//             req.jwt.errors.push(
//               "Error getting auth token from request header.\n" + err
//             );
//             // next();
//             throw err;
//           }
//           // console.log(3);
//           // console.log(req.jwt)
//           try {
//             req.jwt.payload = jwt.verify(req.jwt.token, jwtSecret);
//           } catch (err) {
//             req.jwt.errors.push(
//               "Error getting payload from token '" + req.jwt.token + "'.''" + err
//             );
//             // next();
//             throw err;
//           }
//           // console.log(4);
//           try {
//             req.jwt.user = await User.findById(req.jwt.payload.userId).exec();
//             req.jwt.userRole = req.jwt.user.role;
//             req.jwt.permissions = req.jwt.user.permissions
//           } catch (err) {
//             req.jwt.errors.push(
//               "Error fetching user from payload '" +
//                 req.jwt.payload.toString() +
//                 "'.\n" +
//                 err
//             );
//             // next();
//             throw err;
//           }
//           // console.log("end of jwt capturer");
//         } catch (err) {
//           // console.log("Error in jwt capturer.", err);
//           req.jwt.errors.push(err);
//           // console.log("\n\n\nErrors in JWT. \n\n\nCurrent JWT: ", req.jwt);
//           console.log("error in Auth Token");
//         }
//         next();
//       },
//       //to verify session
//     sessionRequired: function (req, res, next) {
//         try {
//           if (req.jwt.user._id) {
//             next();
//           }
//         } catch (err) {
//           // console.log("JWT: ", req.jwt);
//           // console.log("errors in jwt");
//           res.status(403).json({ status: "fail", message: "Login Required" });
    
//         }
//       },


//       generateNewToken: function (payload) {
//         return jwt.sign(payload, jwtSecret);
//       },
// }

// module.exports = JWT;
