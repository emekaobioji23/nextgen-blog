const {Schema,model} = require("mongoose");
const addon = {
  timeStamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
};
exports.addon = addon;
exports.Schema = Schema;
exports.model=model;