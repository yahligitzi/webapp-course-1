import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comments_model";
import { Express } from "express";
import PostModel from "../models/posts_model";
import CommentModel from "../models/comments_model";
import UserModel, { UserAttributes } from "../models/users_model";

const testComment = {
  content: "This is a comment",
  owner: "inbal4",
  postId: "safgsefdgsdfgsd",
};

var app: Express;

type User = UserAttributes & { token?: string };

const testUser: User = {
  username: "inbal4",
  email: "test4@user.com",
  password: "testpassword",
};

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await PostModel.deleteMany();
  await CommentModel.deleteMany();
  await UserModel.deleteMany();
  await request(app).post("/auth/register").send(testUser);
  const res = await request(app).post("/auth/login").send(testUser);
  testUser.token = res.body.accessToken;
  testUser._id = res.body._id;
  // expect(testUser.token).toBeDefined();
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

let commentId = "";
let postId = "";

describe("Comments Tests", () => {
  test("Comments test get all", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create Comment", async () => {
    const createPostRes = await request(app)
      .post("/posts")
      .set({ authorization: "JWT " + testUser.token })
      .send({
        title: "Test Post",
        content: "Test Content",
        owner: testUser.username,
      });

    postId = createPostRes.body._id;

    const response = await request(app)
      .post("/comments")
      .set({ authorization: "JWT " + testUser.token })
      .send({
        owner: createPostRes.body.owner,
        content: testComment.content,
        postId: postId,
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.content).toBe(testComment.content);
    expect(response.body.owner).toBe(createPostRes.body.owner);
    commentId = response.body._id;
  });

  test("Test get commenty by owner", async () => {
    const response = await request(app)
      .get("/comments?owner=" + testComment.owner)
      .set({ authorization: "JWT " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].content).toBe(testComment.content);
    expect(response.body[0].postId).toBe(postId);
    expect(response.body[0].owner).toBe(testComment.owner);
  });

  test("Comments get post by id", async () => {
    const response = await request(app)
      .get("/comments/" + commentId)
      .set({ authorization: "JWT " + testUser.token });
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe(testComment.content);
    expect(response.body.postId).toBe(postId);
    expect(response.body.owner).toBe(testComment.owner);
  });
});
