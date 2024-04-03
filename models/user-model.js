const validator = require("validator");
const { addon, Schema, model } = require('../utils/addon-schema')
const bcrypt = require('bcrypt');//for hashing passwords

const userSchema = new Schema({

  username: {
    type: String,
    required: [true, "username field is required for all users"],
    trim: true,
    lowerCase: true,
    unique: [true, "A user with this username already exist"],
  },
  password: {
    type: String,
    required: [true, "A user must have an password"],
    select: false,
    minLength: [8, "Password must ba at least 8 characters"],
    validate: {
      validator: function (val) {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])[A-Za-z\d]{8,}/.test(val);
      },
      message:
        "Password must contain at least a number, a lowercase and an uppercase alphabeth",
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user must have an passwordConfirm"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password and confirm password are different",
    },
    select: false,
  },
  email: {
    type: String,
    required: [true, "Email field is required for all users"],
    validate: [validator.isEmail, "Please enter a valid email"],
    // validate: {
    //   validator: async function (val) {
    //     const response = await validate(val);
    //     return response.valid;
    //   },
    //   message: "Please enter a valid email",
    // },
    trim: true,
    lowerCase: true,
    unique: [true, "A user with this email already exist"],
  },
  firstname: {
    type: String,
    required: [true, "The first-name field is required"],
    maxLength: [20, "A first-name must not be more than 20 characters"],
    minLength: [3, "A first-name must be at least 3 characters"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "The last-name field is required"],
    maxLength: [20, "A last-name must not be more than 20 characters"],
    minLength: [3, "A last-name must be at least 3 characters"],
    trim: true,
  },
  role: String,
  passwordResetToken: String,
  passwordChangedAt: Date,
  passwordTokenExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  token: String,
}, { ...addon });

userSchema.pre('save', async function(next){
  try {
    const user = this;
    if (!user.isModified('password')) {
      return next();
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword;
    user.passwordConfirm = undefined;
    next()
  } catch (error) {
      console.log("error:userSchema.pre",error.toString())
      next(error)
  }
});
const User = model('User', userSchema);
module.exports = User;
