const User =require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
      data: [...users],
    });
  }
  exports.isUserAuthorized = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        req.user = user;
        if(user.username === req.query.username){
            next();
        }else{
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
  exports.createUser=async (req, res) => {
    const{body}=req;
    const token = await jwt.sign(
      {
          username: body.username,
          password: body.password,
      },
      process.env.SECRET_TOKEN,
      {
          expiresIn: "24h",
      }
    );
    
    //console.log(req);
    body.token = token;
    await User.create(body);
    res.status(201).json({message:"Post request"});
  }
  exports.findUserById=async (req, res) => {
    const user =  await User.findById(req.params.userId);
    res.status(200).json({
      data: user,
    });
  
  }
  exports.findUserByIdAndUpdate=async (req, res) => {
    const { body } = req;
    const user = await User.findByIdAndUpdate(req.params.userId, body, {
      new: true,
    });
    res.status(200).json({
      data: user,
    });
  }
  exports.deleteUserById=async (req, res) => {
    console.log(req.params);
    const user = await User.findByIdAndDelete(req.params.userId);
    res.status(204).json({
      data: user,
      message: "User Deleted",
    });
  
  }
  exports.authenticateUser = async (req, res, next) => {
    try {
        const {body} = req;
        const user = await User.findOne({username:body.username});
         //req.user = user;
        if(user.password === body.password){
          return res.status(200).json({
            message: "Authentication successful",
          });
        }else{
            return res.status(403).json({
                message: "Authentication not successful",
              });
        }
    } catch (error) {
        return res.status(404).json({
            message: "User not found",
          });
    }
  } 