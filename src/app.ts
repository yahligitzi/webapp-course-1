import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const app = express();
import dotenv from "dotenv";
dotenv.config();

import mongoose, { ConnectOptions } from "mongoose";

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Connected to database");
});

import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

import PostsRoutes from "./routes/posts_routes";
app.use("/posts", PostsRoutes);

import CommentsRoutes from "./routes/comments_routes";
app.use("/comments", CommentsRoutes);

import UsersRoutes from "./routes/users_routes";
app.use("/users", UsersRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

if (process.env.NODE_ENV === "development") {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Web Dev 2022 REST API",
        version: "1.0.0",
        description: "REST server including authentication using JWT",
      },
      servers: [{ url: `http://localhost:${process.env.PORT}` }],
    },
    apis: ["./src/routes/*.ts"],
  };
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}
