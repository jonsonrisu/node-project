const {model, Schema} = require("mongoose");

const userSchem = new Schema({
  username: String,
  email: String,
  password: String,
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
})

userSchem.set('timestamps', true);
userSchem.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});


module.exports = model("User", userSchem);