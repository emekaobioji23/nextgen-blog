const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');//for hashing passwords

const catchAsync = require("../utils/catch-async");
const ErrorObject = require("../utils/error");
const {getAll} = require("./generic-controller");

exports.getAllUsers = getAll(User);
exports.findUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
exports.isUserAuthorized = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    console.log("user.username === req.user.username",user.username,"===",req.user.username);
    if (user.username === req.user.username) {
      next();
    } else {
      return res.status(403).json({
        message: "You are not authorized to update this user",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "User not found",
    });
  }
}
exports.createUser = async (req, res) => {
  try {
    const { body } = req;
    console.log(process.env.TOKEN_COOKIE_EXPIRY);
    const token = jwt.sign(
      {
        username: body.username,
        role: body.role,
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: process.env.TOKEN_COOKIE_EXPIRY,
      }
    );
    body["token"] = token;
    const user = await User.create(body);
    res.clearCookie("token");
    res.clearCookie("userId");
    res.cookie('token', token, { httpOnly: true, expire: process.env.TOKEN_COOKIE_EXPIRY });
    res.cookie('userId', user.id, { httpOnly: true, expire: process.env.TOKEN_COOKIE_EXPIRY });
    res.status(201).json({ id: user.id, token: token, message: "User successfully created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.findUserByIdAndUpdate = async (req, res) => {
  try {
    const { body } = req;
    const user = await User.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
exports.deleteUserById = async (req, res) => {
  try {
    console.log(req.params);
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      data: user,
      message: "User Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
exports.authenticateUser = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.findOne({ username: body.username });
    const hashedPassword = user.password;
    const comparepwd = await bcrypt.compare(body.password,hashedPassword);
    console.log("user.password=",user.password)
    console.log("comparepwd=",comparepwd)
    console.log("body.password=",body.password)
    if(comparepwd){
    //if (user.password === body.password) {
      const token = jwt.sign(
        {
          username: user.username,
          role: user.role,
        },
        process.env.SECRET_TOKEN,
        {
          expiresIn: process.env.TOKEN_COOKIE_EXPIRY,
        }
      );
      res.clearCookie('token');
      res.clearCookie('userId');
      console.log("process.env.TOKEN_COOKIE_EXPIRY", process.env.TOKEN_COOKIE_EXPIRY )
      res.cookie('token', token, { httpOnly: true, maxAge: process.env.TOKEN_COOKIE_EXPIRY });
      res.cookie('userId', user.id, { httpOnly: true, maxAge: process.env.TOKEN_COOKIE_EXPIRY });
      body["token"] = token;
      const user2 = await User.findByIdAndUpdate(user.id, {token:body.token},{new: true,});
      return res.status(200).json({
        user:user2,
        message: "Authentication successful",
      });
    } else {
      return res.status(403).json({
        message: "Authentication not successful",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
}

exports.protected = async (req, res, next) => {
  try {
    if (!req?.headers?.authorization) {
      return res.status(401).json({ message: "Authentication error" });
    }
    console.log("req.headers.authorization",req.headers.authorization);
    console.log("process.env.SECRET_TOKEN",process.env.SECRET_TOKEN);
    console.log("TOKEN_COOKIE_EXPIRY",process.env.TOKEN_COOKIE_EXPIRY);
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
          return res.status(403).json({
            message: "You are not authorized to access this resource",
          });
        } else {
          req.user = { username: decoded.username,role:decoded.role }
          console.log("req.user",req.user);
          next();
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
} 