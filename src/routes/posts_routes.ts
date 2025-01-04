import express from "express";
const router = express.Router();
import { postController, getBySender } from "../controllers/posts_controller";
import { authMiddleware } from "../controllers/auth_controller";

/**
 * @swagger
 * tags:
 *    name: Posts
 *    description: The Posts API
 * components:
 *    schemas:
 *          Posts:
 *              type: object
 *              required:
 *                       - content
 *                       - title
 *                       - owner
 *              properties:
 *                  content:
 *                      type: string
 *                      description: The post content
 *                  title:
 *                      type: string
 *                      description: The post title
 *                  owner:
 *                      type: string
 *                      description: The post owner
 *              example:
 *                  content: 'post content'
 *                  title: 'post title'
 *                  owner: '123456'
 * /posts/:
 *      get:
 *          summary: get all posts
 *          tags: [Posts]
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: The posts
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Posts'
 *      post:
 *          summary: create new post
 *          tags: [Posts]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Posts'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              201:
 *                  description: The created post
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Posts'
 *      put:
 *          summary: update post
 *          tags: [Posts]
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Posts'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              201:
 *                  description: The updates post
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Posts'
 * /posts/post/:
 *      get:
 *          summary: get posts by sender
 *          tags: [Posts]
 *          parameters:
 *              - in: path
 *                name: sender
 *                schema:
 *                  type: string
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: The posts written by the sender
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Posts'
 * /posts/post/:id:
 *      get:
 *          summary: get posts by sender
 *          tags: [Posts]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: The posts written by the sender
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Posts'
 */

router.get("/", postController.getAll.bind(postController));

router.post("/", authMiddleware, postController.post.bind(postController));

router.get("/post/:id", postController.getById.bind(postController));

router.get("/post", getBySender.bind(postController));

router.put("/", authMiddleware, postController.update.bind(postController));

export default router;
