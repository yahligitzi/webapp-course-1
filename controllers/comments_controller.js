const Posts = require("../models/posts_model");
const Comments = require("../models/comments_model");

const getById = async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id);
    res.send(comment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const create = async (req, res) => {
  try {
    const post = await Posts.findById(req.body.postId);
    if (!post) {
      throw new Error("Post does not exist.");
    }

    const comment = await Comments.create(req.body);
    res.status(201).send(comment);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const update = async (req, res) => {
  try {
    const comment = await Comments.findByIdAndUpdate(
      { _id: req.body._id },
      req.body
    );
    res.status(200).send(comment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comments.deleteOne({ _id: req.params.id });
    res.status(200).send(comment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getByPostId = async (req, res) => {
  try {
    const comments = await Comments.find({ postId: req.params.postId });
    res.status(200).send(comments);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getById,
  create,
  update,
  deleteComment,
  getByPostId,
};
