const { Schema,model } = require("mongoose");

const userSchema = new Schema({
  username: String, // String is shorthand for {type: String}
  password: String,
  email: String,
  firstname: String,
  lastname: String,
  hidden: Boolean,
  role:String,
  token:String
});

const User = model('User',userSchema);
module.exports = User;
