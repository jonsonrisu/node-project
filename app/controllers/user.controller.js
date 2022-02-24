const db = require("../models");

const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {

    User.find().then(data => {
      res.send({ success: true, message: "Post fetch successfully", res: data });
    });
  }
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

// Delete a Post with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id).then(
      data => {
          if (!data) {
              res.status(404).send({
                  success: false, message: `Cannot delete User with id=${id}. Maybe User was not found!`
              })
          } else res.send({ success: true, message: "User was deleted successfully!" })
      }).catch(err => {
          res.status(500).send({
              message: "Could not delete User with id=" + id
          });
      }
      )
};