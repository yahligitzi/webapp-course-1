const express = require("express");
const router = express.Router();
const Post = require("../controllers/posts_controller");

router.get("/", Post.getAllPosts);

router.post("/", Post.createPost);

router.get("/post/:id", Post.getById);

router.get("/post", Post.getBySender);

router.put("/", Post.update);

module.exports = router;
