const {Schema, model,addon} = require('../utils/addon-schema')

const userSchema = new Schema({
  username: String, // String is shorthand for {type: String}
  password: String,
  email: String,
  firstname: String,
  lastname: String,
  hidden: Boolean,
  role: String,
  token: String
}, {...addon});

const User = model('User', userSchema);
module.exports = User;
