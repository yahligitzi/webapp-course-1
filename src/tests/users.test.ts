import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import { Express } from "express";
import CommentModel from "../models/comments_model";
import PostModel from "../models/posts_model";
import UserModel, { UserAttributes } from "../models/users_model";

var app: Express;

type User = UserAttributes & { token?: string };
const testUser: User = {
  _id: "507f1f77bcf86cd799439011",
  username: "inbal3",
  email: "test3@user.com",
  password: "testpassword",
};

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
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

let postId = "";
describe("Users tests", () => {
  test("Test users get all", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test("Test get user by id", async () => {
    const response = await request(app).get("/users/" + testUser._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe(testUser.username);
    expect(response.body.email).toBe(testUser.email);
  });

  test("Test update user", async () => {
    const response = await request(app)
      .put("/users/")
      .set({ authorization: "JWT " + testUser.token })
      .send({
        _id: testUser._id,
        username: testUser.username + "changed",
      });

    expect(response.statusCode).toBe(201);
  });

  test("Test get user by id after change", async () => {
    const response = await request(app).get("/users/" + testUser._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe(testUser.username + "changed");
    expect(response.body.email).toBe(testUser.email);
  });

  test("Test delete user", async () => {
    const response = await request(app)
      .delete("/users/" + testUser._id)
      .set({ authorization: "JWT " + testUser.token });
    expect(response.statusCode).toBe(200);
  });
});
