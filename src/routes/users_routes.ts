import express from "express";
const router = express.Router();
import usersController from "../controllers/users_controller";
import { authMiddleware } from "../controllers/auth_controller";

/**
 * @swagger
 * tags:
 *    name: Users
 *    description: The Users API
 * components:
 *    schemas:
 *          Users:
 *              type: object
 *              required:
 *                       - email
 *                       - username
 *              properties:
 *                  email:
 *                      type: string
 *                      description: The user email
 *                  password:
 *                      type: string
 *                      description: The user password
 *                  username:
 *                      type: string
 *                      description: The user username
 *              example:
 *                  email: 'bla@user.com'
 *                  password: 'blabla'
 *                  username: 'bla'
 * /users/:
 *      get:
 *          summary: get all users
 *          tags: [Users]
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: The users
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Users'
 *      post:
 *          summary: create new user
 *          tags: [Users]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Users'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              201:
 *                  description: The created user
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Users'
 *      put:
 *          summary: update user
 *          tags: [Users]
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Users'
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              201:
 *                  description: The updated user
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Users'
 * /users/:id:
 *      delete:
 *          summary: delete user by id
 *          tags: [Users]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: The deleted user
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Users'
 *      get:
 *          summary: get user by id
 *          tags: [Users]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: The user by id
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Users'
 */

router.get("/", usersController.getAll.bind(usersController));

router.get("/:id", usersController.getById.bind(usersController));

router.delete(
  "/:id",
  authMiddleware,
  usersController.delete.bind(usersController)
);

router.put("/", authMiddleware, usersController.update.bind(usersController));

export default router;
