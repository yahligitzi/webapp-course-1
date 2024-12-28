import { Request, Response } from "express";
import createController from "./base_controller";
import CommentModel, { CommentAttributes } from "../models/comments_model";

const commentsController = createController<CommentAttributes>(CommentModel);

const getByPostId = async (req: Request, res: Response) => {
  try {
    const comments = await CommentModel.find({ postId: req.params.postId });
    res.status(200).send(comments);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { commentsController, getByPostId };
