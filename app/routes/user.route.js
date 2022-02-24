const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  router.get("/", controller.allAccess);

  router.get("/user", controller.userBoard);

  router.get("/admin",controller.adminBoard);

  router.delete("/delete/:id", controller.deleteUser);
  
  app.use('/api/users',[authJwt.verifyToken],
  router);

};