const { authJwt } = require("../middleware");
const images = require("../controllers/upload.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
            'Access-Control-Allow-Origin: *' 
        );
        next();
    });



var router = require("express").Router();

  // Create a new post
  router.post("/",  images.uploadFiles);

  //Retrieve all images
  router.get("/", images.getListFiles);


  // // Delete a post with id
  // router.delete("/:id", images.delete);


  app.use('/api/images', [authJwt.verifyToken],
  router);


};