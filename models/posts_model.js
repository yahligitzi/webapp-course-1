const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postsSchema = new Schema({
  title: String,
  content: String,
  owner: String,
});

const Posts = mongoose.model("Posts", postsSchema);
module.exports = Posts;
