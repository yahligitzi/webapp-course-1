import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postModel from "../models/posts_model";
import { Express } from "express";
import userModel, { UserAttributes } from "../models/users_model";
import commentModel from "../models/comments_model";

var app: Express;

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await userModel.deleteMany();
  await commentModel.deleteMany();
  await postModel.deleteMany();
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

const baseUrl = "/auth";

type User = UserAttributes & {
  accessToken?: string;
  refreshToken?: string;
};

const testUser: User = {
  username: "test",
  email: "test@user.com",
  password: "testpassword",
};

describe("Auth Tests", () => {
  test("Auth test register", async () => {
    const response = await request(app)
      .post(baseUrl + "/register")
      .send(testUser);
    expect(response.statusCode).toBe(200);
  });

  test("Auth test same user register fail", async () => {
    const response = await request(app)
      .post(baseUrl + "/register")
      .send(testUser);
    expect(response.statusCode).not.toBe(200);
  });

  test("Auth test missing fields register fail", async () => {
    const response = await request(app)
      .post(baseUrl + "/register")
      .send({
        username: "bla",
        email: "bla@user.com",
      });
    expect(response.statusCode).not.toBe(200);
    const response2 = await request(app)
      .post(baseUrl + "/register")
      .send({
        username: "",
        password: "bla",
      });
    expect(response2.statusCode).not.toBe(200);
    const response3 = await request(app)
      .post(baseUrl + "/register")
      .send({
        email: "",
        password: "bla",
      });
    expect(response3.statusCode).not.toBe(200);
  });

  test("Auth test login", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send(testUser);
    expect(response.statusCode).toBe(200);
    const accessToken = response.body.accessToken;
    const refreshToken = response.body.refreshToken;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
    expect(response.body._id).toBeDefined();
    testUser.accessToken = accessToken;
    testUser.refreshToken = refreshToken;
    testUser._id = response.body._id;
  });

  test("Check tokens are not the same", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send(testUser);
    const accessToken = response.body.accessToken;
    const refreshToken = response.body.refreshToken;

    expect(accessToken).not.toBe(testUser.accessToken);
    expect(refreshToken).not.toBe(testUser.refreshToken);
  });

  test("Auth test login fail", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send({
        email: testUser.email,
        password: "bla",
      });
    expect(response.statusCode).not.toBe(200);

    const response2 = await request(app)
      .post(baseUrl + "/login")
      .send({
        email: "bla@bla.com",
        password: "bla",
      });
    expect(response2.statusCode).not.toBe(200);
  });

  test("Auth test restricted api", async () => {
    const response = await request(app).post("/posts").send({
      title: "Test Post",
      content: "Test Content",
      owner: "test",
    });
    expect(response.statusCode).not.toBe(201);
    const response2 = await request(app)
      .post("/posts")
      .set({ authorization: "JWT " + testUser.accessToken })
      .send({
        title: "Test Post",
        content: "Test Content",
        owner: "test",
      });
    expect(response2.statusCode).toBe(201);
  });

  test("Test refresh token", async () => {
    const response = await request(app)
      .post(baseUrl + "/refresh")
      .send({
        refreshToken: testUser.refreshToken,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
    testUser.accessToken = response.body.accessToken;
    testUser.refreshToken = response.body.refreshToken;
  });

  test("Double use refresh token", async () => {
    const response = await request(app)
      .post(baseUrl + "/refresh")
      .send({
        refreshToken: testUser.refreshToken,
      });
    expect(response.statusCode).toBe(200);
    const refreshTokenNew = response.body.refreshToken;

    const response2 = await request(app)
      .post(baseUrl + "/refresh")
      .send({
        refreshToken: testUser.refreshToken,
      });
    expect(response2.statusCode).not.toBe(200);

    const response3 = await request(app)
      .post(baseUrl + "/refresh")
      .send({
        refreshToken: refreshTokenNew,
      });
    expect(response3.statusCode).not.toBe(200);
  });

  test("Test logout", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send(testUser);
    expect(response.statusCode).toBe(200);
    testUser.accessToken = response.body.accessToken;
    testUser.refreshToken = response.body.refreshToken;

    const response2 = await request(app)
      .post(baseUrl + "/logout")
      .send({
        refreshToken: testUser.refreshToken,
      });
    expect(response2.statusCode).toBe(200);

    const response3 = await request(app)
      .post(baseUrl + "/refresh")
      .send({
        refreshToken: testUser.refreshToken,
      });
    expect(response3.statusCode).not.toBe(200);
  });

  jest.setTimeout(10000);
  test("Test timeout token ", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send(testUser);
    expect(response.statusCode).toBe(200);
    testUser.accessToken = response.body.accessToken;
    testUser.refreshToken = response.body.refreshToken;

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response2 = await request(app)
      .post("/posts")
      .set({ authorization: "JWT " + testUser.accessToken })
      .send({
        title: "Test Post",
        content: "Test Content",
        owner: "test",
      });
    expect(response2.statusCode).not.toBe(201);

    const response3 = await request(app)
      .post(baseUrl + "/refresh")
      .send({
        refreshToken: testUser.refreshToken,
      });
    expect(response3.statusCode).toBe(200);
    testUser.accessToken = response3.body.accessToken;

    const response4 = await request(app)
      .post("/posts")
      .set({ authorization: "JWT " + testUser.accessToken })
      .send({
        title: "Test Post",
        content: "Test Content",
        owner: "test",
      });
    expect(response4.statusCode).toBe(201);
  });
});
