import mongoose from "mongoose";

export interface UserAttributes {
  username: string;
  email: string;
  password: string;
  _id?: string;
  refreshToken?: string[];
}

const userSchema = new mongoose.Schema<UserAttributes>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: [String],
    default: [],
  },
});

const UserModel = mongoose.model<UserAttributes>("Users", userSchema);
export default UserModel;
