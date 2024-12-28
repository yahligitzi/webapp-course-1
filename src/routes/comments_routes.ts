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
 * /comments/:
 *      get:
 *          summary: get all comments
 *          tags: [Comments]
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: The comments
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comments'
 *      post:
 *          summary: create new comment
 *          tags: [Comments]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comments'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              201:
 *                  description: The created comment
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comments'
 *      put:
 *          summary: update comment
 *          tags: [Comments]
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Comments'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              201:
 *                  description: The updates comment
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comments'
 * /comments/:id:
 *      delete:
 *          summary: delete comment by id
 *          tags: [Comments]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: The deleted comment
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comments'
 *      get:
 *          summary: get comment by id
 *          tags: [Comments]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: The comment by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comments'
 * /comments/post/:postId:
 *      get:
 *          summary: get comments by post
 *          tags: [Comments]
 *          parameters:
 *              - in: path
 *                name: postId
 *                schema:
 *                  type: string
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: The comments by a specific post
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Comments'
 */
router.get("/:id", commentsController.getById.bind(commentsController));

router.post("/", commentsController.post.bind(commentsController));

router.put("/", commentsController.update.bind(commentsController));

router.delete("/:id", commentsController.delete.bind(commentsController));

router.get("/post/:postId", getByPostId);

router.get("", commentsController.getAll.bind(commentsController));

export default router;
