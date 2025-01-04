import mongoose from "mongoose";

export interface CommentAttributes {
  content: string;
  owner: string;
  postId: mongoose.Types.ObjectId;
}

const Schema = mongoose.Schema;
const commentSchema = new Schema<CommentAttributes>({
  content: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    ref: "Users",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Posts",
    required: true,
  },
});

const CommentModel = mongoose.model<CommentAttributes>(
  "Comments",
  commentSchema
);
export default CommentModel;
