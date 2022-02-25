const db = require("../models");


const User = db.user;
const Post = db.post;
const Tea = db.tea;




exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {

    User.find().then(data => {
      res.send({ success: true, message: "Post fetch successfully", res: data });
    });
  }
  
  exports.adminBoard = async (req, res) => {

    let activePosts = 0;
    let totalPosts = 0;
    let totalUsers = 0;
    let totalTeas =0;
    let todayUsers =  0;
    activePosts = await Post.count({status:"Y"});
    totalUsers = await User.count({});
    totalPosts = await Post.count({});
    totalTeas = await Tea.count({});
    var start = new Date();
    start.setHours(0,0,0,0);
    var end = new Date();
    end.setHours(23,59,59,999);
    todayUsers = await User.count({
      createdAt: {
        $gte: start,
        $lte: end
      }});

    
    res.status(200).send({ 
      message: "Admin Dashboard.", 
       activePosts:activePosts,
       totalPosts:totalPosts,
       totalUsers:totalUsers,
       totalUsers:totalUsers,
       todayUsers:todayUsers,
       totalTeas:totalTeas 
    });
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