const express = require("express");
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Connected to database");
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PostsRoutes = require("./routes/posts_routes");
app.use("/posts", PostsRoutes);

const CommentsRoutes = require("./routes/comments_routes");
app.use("/comments", CommentsRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
