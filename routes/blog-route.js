const express = require('express');
const { findBlogById, findBlogByIdAndUpdate, deleteBlogById, 
    getAllBlogs, createBlog,findBlogByAuthor, findBlogByContent,isAuthorAuthorized} = require('../controllers/blog-controller');

const router =express.Router();

router.route('/:blogId').get(findBlogById).patch(isAuthorAuthorized,findBlogByIdAndUpdate).delete(deleteBlogById);
router.route('/author').search(findBlogByAuthor);
router.route('/content').search(findBlogByContent);
router.get("/",getAllBlogs);
router.post("/",createBlog);

module.exports = router;