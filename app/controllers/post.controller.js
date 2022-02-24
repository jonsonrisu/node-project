const db = require("../models");

const Post = db.post;


const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Title is required" });
        return;
    } else if (!req.body.description) {
        res.status(400).send({ message: "Description can not be empty!" });
    }
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status ? req.body.status : 'Y'
    });

    post.save(post).then(data => {
        res.send({ success: true, message: "Post save successfully", data: data });
    })
        .catch(err => {
            res.status(500).send({
                success: false,
                message:
                    err.message || "Some error occurred while creating the Post.",
                data: null
            });
        });
};


// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
    //pagination 
    const { page, size, title } = req.query;
    var condition = title
      ? { title: { $regex: new RegExp(title), $options: "i" } }
      : {};
    const { limit, offset } = getPagination(page, size);
         Post.paginate(condition, { offset, limit }) .then((data) => {
            res.send({
            success: true, 
            message: "Post get success",
            totalItems: data.totalDocs,
            res: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1,
            });
          });
};


// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Post.findById(id).then(data => {
        if (!data)
            res.status(404).send({ success: false, message: "Not found Post with id " + id, data: null });
        else res.send({ success: true, message: "Post get success", res: data });
    })
};


// Update a Post by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            success: false,
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Post.findByIdAndUpdate(id, req.body, { useFindModify: false }).then(
        data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    message: `Cannot update Tutorial with id=${id}. Maybe Post was not found!`
                })
            }
            else res.send({ success: true, message: "Tutorial was updated successfully." });

        }).catch(err => {
            res.status(500).send({
                success: false,
                message: "Error updating Tutorial with id=" + id
            });
        });

};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndRemove(id).then(
        data => {
            if (!data) {
                res.status(404).send({
                    success: false, message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
                })
            } else res.send({ success: true, message: "Post was deleted successfully!" })
        }).catch(err => {
            res.status(500).send({
                message: "Could not delete Post with id=" + id
            });
        }
        )
};


// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
    Post.deleteMany({}).then(data => {
        res.send({
          message: `${data.deletedCount} Post were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all posts."
        });
      });
};


// Find all active Posts
exports.findAllActivePost = (req, res) => {

};