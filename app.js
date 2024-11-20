const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PostsRoutes = require("./routes/posts_routes");
app.use("/posts", PostsRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
