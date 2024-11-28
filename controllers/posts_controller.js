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

const getById = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getBySender = async (req, res) => {
  try {
    if (!req.query.sender) {
      return await getAllPosts();
    }
    const post = await Posts.find({ owner: req.query.sender });
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update = async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate({ _id: req.body._id }, req.body);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getById,
  getBySender,
  update,
};
