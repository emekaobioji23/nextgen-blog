const Joi = require('joi')
const {addon,Schema,model} = require('../utils/addon-schema')


const userSchema = new Schema({
  username: String, // String is shorthand for {type: String}
  password: String,
  email: String,
  firstname: String,
  lastname: String,
  hidden: Boolean,
  role: String,
  token: String
},{...addon});

const validateUser = (obj)=> {
	var expectedUserRequirements = Joi.object({
		username: Joi.string().min(6).max(30).required(),
		password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
		email: Joi.string().email().required(),
		firstname: Joi.string().required(),
		lastname: Joi.string().required(),
    role: Joi.string().required(),
	})
  const {error} = expectedUserRequirements.validate(obj)
  if(error){ return false;}else{return true}
}
const User = model('User', userSchema);
module.exports = {User,validateUser}; 
