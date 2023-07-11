const express = require('express');
const mongoose = require("mongoose");
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(express.json());
const fs = require('fs');

app.use(express.urlencoded({ extended: false }));
const writeErrorToFile = (errorMessage) => {
  const fileName = 'error.log';
  const currentTime = new Date().toISOString();

  // Create the error message with timestamp
  const errorLog = `${currentTime}: ${errorMessage}\n`;

  // Write the error message to the file
  fs.appendFile(fileName, errorLog, (err) => {
    if (err) {33
      console.error('Error writing to file:', err);
    }
  });
};
mongoose.set("strictQuery", true);
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}:${process.env.port}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  app.route("/").get((req, res) => res.json("You are connected to Server."));

  app.use('/user', require('./routes/user.auth'));
  app.use('/user', require('./routes/freelancer.auth'));
  app.use('/blog', require('./routes/blog.routes'));
  app.use('/company', require('./routes/company.details'));
app.use('/subs', require('./routes/company.subscription.services'));
app.use('/subs', require('./routes/one.time.subs'));
app.use('/otp', require('./routes/otp.verify.email'));
app.use("/freelancer", require("./routes/freelancer.profile"));
app.use('/freelancerDesc', require("./routes/freelancerdesc"));
app.use('/fhistory',require('./routes/fhistory'));
app.use('/services', require('./routes/services'));
app.use('/invoice', require('./routes/performa.invoice'));
app.use('/user', require('./routes/user.profile'));
app.use('/company', require('./routes/company.auth'));

connectDB().then(() => {
  app.listen(process.env.port, () => {
    console.log("listening for requests");
  });
});