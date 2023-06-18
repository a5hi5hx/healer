const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.post('/addBlog', async (req, res) => {
  try {
    const { titles, content, company, service } = req.body;
    if (!titles || !content || !company || !service) {
      return res.status(400).json({ message: 'Missing required fields.', success: false });
    }
    const blog = new Blog({
      titles,
      content,
      company,
      service,
    });
    const newBlog = await blog.save();
   return res.status(201).json({ message: 'Blog added successfully.', success: true});
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred.', success: false, error: error.message });
  }
});

router.get('/companyBlog/:id', async (req, res) => {
    const companyId = req.params.id;
    try {
      const blogs = await Blog.find({ company: companyId });
      if (blogs.length === 0) {
        return res.status(404).json({ message: 'No blogs found for the specified company.', success: false });
      }
      res.status(200).send(blogs);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred.', success: false, error: error.message });
    }
  });

  router.get('/allBlogs', async (req, res)=> {
try {
  const blogs = await Blog.find();
  if (blogs.length === 0) {
    return res.status(404).json({ message: 'No blogs found', success: false });
  }
  res.status(200).send(blogs);
} catch (error) {
  return res.status(500).json({ message: 'An error occurred.', success: false, error: error.message });
}
  });
module.exports = router;
