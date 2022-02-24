// const {model, Schema} = require("mongoose");

const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");


// const postSchem = new Schema({
//     title: String,
//     description: String,
//     status: {
//         type: String,
//         enum : ['Y','N'], 
//         default: 'Y'
//     },
//   });
  
//   postSchem.plugin(mongoosePaginate);

//   postSchem.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });



//   module.exports = model("Post", postSchem);


  module.exports = (mongoose, mongoosePaginate)  => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        status: {
            type: String,
            enum : ['Y','N'], 
            default: 'Y'
        },
      },
     
    );
    schema.plugin(mongoosePaginate);
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Post = mongoose.model("Post", schema);
    return Post;
  };