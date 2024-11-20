const Posts = require("../models/posts_model");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Posts.create(req.body);
    res.status(201).send(post);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  getAllPosts,
  createPost,
};
