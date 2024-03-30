const { Schema,model } = require("mongoose");

//create a model {author=userid, content=body of message, createdDate=date}
const blogSchema = new Schema({
  author: String, // String is shorthand for {type: String}
  content: String,
  createdDate: String,
  modifiedDate:String,
});

const Blog = model('Blog',blogSchema);
module.exports = Blog;
