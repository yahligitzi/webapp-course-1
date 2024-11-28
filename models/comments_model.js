const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentsSchema = new Schema({
  content: String,
  owner: String,
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Posts",
    required: true,
  },
});

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;
