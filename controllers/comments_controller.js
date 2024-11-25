const Comments = require("../models/comments_model");

// READ
const getById = async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id);
    res.send(comment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// CREATE
const create = async (req, res) => {
  try {
    const comment = await Comments.create(req.body);
    res.status(201).send(comment);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// UPDATE
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

// DELETE
const deleteComment = async (req, res) => {
  try {
    const comment = await Comments.deleteOne({ _id: req.body._id });
    res.status(200).send(comment);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET BY POST
const getByPostId = async (req, res) => {
  try {
    const comments = await Comments.find({ postId: req.query.postId });
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
