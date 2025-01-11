import { Request, Response } from "express";
import createController from "./base_controller";
import PostModel, { PostAttributes } from "../models/posts_model";

const postController = createController<PostAttributes>(PostModel);

const getBySender = async (req: Request, res: Response) => {
  try {
    if (!req.query.sender) {
      return await postController.getAll(req, res);
    }
    const post = await PostModel.find({ owner: req.query.sender });
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { postController, getBySender };
