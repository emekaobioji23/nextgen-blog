const Blog =require("../models/blog");
exports.getAllBlogs = async (req, res, next) => {
    const blogs = await Blog.find();
    res.status(200).json({
      data: [...blogs],
    });
  }
  
  exports.createBlog=async (req, res) => {
    //console.log(req);
    const{body}=req;
    await Blog.create(body);
    res.status(201).json({message:"Post request"});
  }
  exports.findBlogById=async (req, res) => {
    console.log(req.baseUrl);
    const blog =  await Blog.findById(req.params.blogId);
    res.status(200).json({
      data: blog,
    });
  
  }
  //middleware
  exports.isAuthorAuthorized = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.blogId);
        const {body} = req;
        //req.blog = blog;
        if(blog.author === body.authorId){
            next();
        }else{
            return res.status(403).json({
                message: "Author is not authorized to update this blog",
              });
        }
    } catch (error) {
        return res.status(404).json({
            message: "Blog not found",
          });
    }
  }
  exports.findBlogByIdAndUpdate=async (req, res) => {
    const { body } = req;
    const blog = await Blog.findByIdAndUpdate(req.params.blogId, body, {
      new: true,
    });
    res.status(200).json({
      data: blog,
    });
  }
  exports.findBlogByAuthor= async (req, res) => {
      console.log(req.query.author);
   const blogs = await Blog.find().where({'author':`${req.query.author}`});
    res.status(200).json({data: blogs,});
  }
  exports.findBlogByContent=async (req, res) => {
    const blogs = await Blog.find().where({'content':`${req.query.content}`});
    res.status(200).json({
      data: blogs,
    });
  }
  exports.deleteBlogById=async (req, res) => {
    //console.log(req.params);
    const blog = await Blog.findByIdAndDelete(req.params.blogId);
    res.status(204).json({
      data: blog,
      message: "Blog Deleted",
    });
  
  }