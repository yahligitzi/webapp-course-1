import express from "express";
const router = express.Router();
import {
  getByPostId,
  commentsController,
} from "../controllers/comments_controller";

/**
 * @swagger
 * tags:
 *    name: Comments
 *    description: The Comments API
 * components:
 *    schemas:
 *          Comments:
 *              type: object
 *              required:
 *                       - content
 *                       - postId
 *                       - owner
 *              properties:
 *                  content:
 *                      type: string
 *                      description: The post content
 *                  postId:
 *                      type: string
 *                      description: The post id related to the comment
 *                  owner:
 *                      type: string
 *                      description: The post owner
 *              example:
 *                  content: 'post content'
 *                  postId: '123'
 *                  owner: '123456'
 */

router.get("/:id", commentsController.getById.bind(commentsController));

router.post("/", commentsController.post.bind(commentsController));

router.put("/", commentsController.update.bind(commentsController));

router.delete("/:id", commentsController.delete.bind(commentsController));

router.get("/post/:postId", getByPostId);

export default router;
