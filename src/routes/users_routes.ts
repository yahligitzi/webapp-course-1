import express from "express";
const router = express.Router();
import usersController from "../controllers/users_controller";

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
 *                  username:
 *                      type: string
 *                      description: The user username
 *              example:
 *                  email: 'usernameexample'
 *                  username: '123456'
 */

router.get("/", usersController.getAll.bind(usersController));

router.post("/", usersController.post.bind(usersController));

router.get("/:id", usersController.getById.bind(usersController));

router.delete("/:id", usersController.delete.bind(usersController));

router.put("/", usersController.update.bind(usersController));

export default router;
