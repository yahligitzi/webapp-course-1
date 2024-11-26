const express = require("express");
const router = express.Router();
const Comment = require("../controllers/comments_controller");

router.get("/:id", Comment.getById);

router.post("/", Comment.create);

router.put("/", Comment.update);

router.delete("/:id", Comment.deleteComment);

router.get("/post/:postId", Comment.getByPostId);

module.exports = router;
