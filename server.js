const express = require('express');
const mongoose = require('mongoose');

const cors = require("cors");

const app = express();
const path = require("path");
const dbConfig = require('./app/config/db.config')


var corsOptions = {
    origin: "http://localhost:8081"
  };

  mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


  const dbs = require("./app/models");
  const Role = dbs.role;

  // function initial() {
  //   Role.estimatedDocumentCount((err, count) => {
  //     if (!err && count === 0) {
  //       new Role({
  //         name: "user"
  //       }).save(err => {
  //         if (err) {
  //           console.log("error", err);
  //         }
  
  //         console.log("added 'user' to roles collection");
  //       });
  
  //       new Role({
  //         name: "moderator"
  //       }).save(err => {
  //         if (err) {
  //           console.log("error", err);
  //         }
  
  //         console.log("added 'moderator' to roles collection");
  //       });
  
  //       new Role({
  //         name: "admin"
  //       }).save(err => {
  //         if (err) {
  //           console.log("error", err);
  //         }
  
  //         console.log("added 'admin' to roles collection");
  //       });
  //     }
  //   });
  // }

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('./uploads'));


// routes
require('./app/routes/auth.route')(app);
require('./app/routes/user.route')(app);
require('./app/routes/post.route')(app);
require('./app/routes/tea.route')(app);



// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}.`);
});