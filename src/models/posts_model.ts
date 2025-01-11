import mongoose from "mongoose";

export interface PostAttributes {
  content: string;
  owner: string;
  title: string;
}

const postSchema = new mongoose.Schema<PostAttributes>({
  content: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
    ref: "Users",
  },
  title: {
    type: String,
    required: true,
  },
});

const PostModel = mongoose.model<PostAttributes>("Posts", postSchema);
export default PostModel;
