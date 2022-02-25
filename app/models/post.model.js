
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");



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
    schema.set('timestamps', true);
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Post = mongoose.model("Post", schema);
    return Post;
  };