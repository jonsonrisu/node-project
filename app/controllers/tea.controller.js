const multer = require('multer');

const db = require("../models");

const Tea = db.tea;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-tea-${file.originalname}`);
    }
});

const uploadImg = multer({ storage: storage }).single('image');

const newTea = (req, res) => {
    //check if the tea name already exists in db

    Tea.findOne({ name: req.body.name }, (err, data) => {
        //if tea not in db, add it
        if (!data) {
            const newTea = new Tea({
                name: req.body.name,
                image: req.file.path,  //update this
                description: req.body.description,
                keywords: req.body.keywords,
                origin: req.body.origin,
                brew_time: req.body.brew_time,
                temperature: req.body.temperature,
            })
            // save this object to database
            newTea.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.json({ success: true, message: "Tea save successfully", res:data});
            })
            //if there's an error or the tea is in db, return a message         
        } else {
            if (err) return res.json({ success: false, message:`Something went wrong, please try again. ${err}`,res:null});
            return res.json({ success: false, message: "Tea already exists",res:null });
        }
    })
};


//GET all teas
const getAllTea = (req, res) => {
    Tea.find({}, (err, data)=>{
        if (err){
            return res.json({ success: false, message:`Something went wrong, please try again. ${err}`,res:null});
        }
        return res.json({ success: true, message: "", res:data});
    })
};


const getOneTea = (req, res) => {
    let name = req.params.name; //get the tea name
    //find the specific tea with that name
    Tea.findOne({name:name}, (err, data) => {
    if(err || !data) {
        return res.json({success: false,message: "Tea doesn't exist.", res:null});
    }
    else return res.json({ success: true, message: "", res:data}); //return the tea object if found
    });
};


//POST 1 tea comment
const newComment = (req, res) => {
    let name = req.params.name; //get the tea to add the comment in

    let newComment = req.body.comment; //get the comment
 
    let username = req.body.username;
    //create a comment object to push
    const comment = {
        text: newComment,
        user:username,
        date: new Date()
    }
    //find the tea object
    Tea.findOne({name:name}, (err, data) => {
        if(err || !data || !newComment) {
            return res.json({message: "Tea doesn't exist."});
        }
        else {
            //add comment to comments array of the tea object
            data.comments.push(comment);
            //save changes to db
            data.save(err => {
                if (err) { 
                return res.json({success: false, message: "Comment failed to add.", error:err});
                }
                return res.json({ success: true, message: "Feedback post successfully.", res:data});
            })  
        } 
    })
  };


//DELETE 1 tea
const deleteOneTea = (req, res) => {
    let name = req.params.name; // get the name of tea to delete
    Tea.deleteOne({name:name}, (err, data) => {
    //if there's nothing to delete return a message
    if( data.deletedCount == 0) return res.json({success: false, message: "Tea doesn't exist."});
    //else if there's an error, return the err message
    else if (err) return res.json({success: false, message:`Something went wrong, please try again. ${err}`});
    //else, return the success message
    else return res.json({success: true, message: "Tea deleted."});
    });
};

module.exports = {

    uploadImg,  //include the new guy
    newTea,
    getAllTea,
    getOneTea,
    deleteOneTea,
    newComment,

};

