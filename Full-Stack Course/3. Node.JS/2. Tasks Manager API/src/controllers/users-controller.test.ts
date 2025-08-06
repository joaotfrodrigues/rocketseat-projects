import request from "supertest";

import { prisma } from "@/database/prisma";
import { app } from "@/app";


describe("Users Controller", () => {
  const email: string = "testuser@test.com";
  const name: string = "Test User";
  let userId: string;

  afterAll(async () => {
    await prisma.user.delete({ where: { id: userId } });
  });

  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name,
      email,
      password: "123456"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(name);
    expect(response.body.email).toBe(email);

    userId = response.body.id;
  });

  it("should throw an error if no body is sent", async () => {
    const response = await request(app).post("/users").send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
    expect(response.body.issues).toHaveProperty("errors");
  });

  it("should throw an error if name is too short", async () => {
    const response = await request(app).post("/users").send({
      name: "a",
      email,
      password: "123456"
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
    expect(response.body.issues.properties).toHaveProperty("name");
  });

  it("should throw an error if name is too long", async () => {
    const response = await request(app).post("/users").send({
      name: "a".repeat(51),
      email,
      password: "123456"
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
    expect(response.body.issues.properties).toHaveProperty("name");
  });

  it("should throw an error if email is invalid", async () => {
    const response = await request(app).post("/users").send({
      name,
      email: name,
      password: "123456"
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
    expect(response.body.issues.properties).toHaveProperty("email");
  });

  it("should throw an error if password is too short", async () => {
    const response = await request(app).post("/users").send({
      name,
      email,
      password: "123"
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
    expect(response.body.issues.properties).toHaveProperty("password");
  });

  it("should throw an error if password is too long", async () => {
    const response = await request(app).post("/users").send({
      name,
      email,
      password: "a".repeat(17)
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
    expect(response.body.issues.properties).toHaveProperty("password");
  });
});
