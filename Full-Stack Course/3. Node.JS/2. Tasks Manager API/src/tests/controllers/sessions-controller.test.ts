import request from "supertest";

import { prisma } from "@/database/prisma";
import { app } from "@/app";


describe("Sessions Controller", () => {
  const name: string = "Sessions Test User";
  const email: string = "authtestuser@test.com";
  const password: string = "123456";

  let userId: string;

  afterAll(async () => {
    await prisma.user.delete({ where: { id: userId } });
  });

  it("should'nt throw an error. We're creating sessions test user", async () => {
    const response = await request(app).post("/users").send({
      name,
      email,
      password
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(name);
    expect(response.body.email).toBe(email);

    userId = response.body.id;
  });

  it("should login successfully", async () => {
    const response = await request(app).post("/sessions").send({
      email,
      password
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should throw an error if email is invalid", async () => {
    const response = await request(app).post("/sessions").send({
      email: name,
      password
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
    expect(response.body.issues.properties).toHaveProperty("email");
  });

  it("should throw an error if email is wrong", async () => {
    const response = await request(app).post("/sessions").send({
      email: "wrongtestuser@test.com",
      password
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid e-mail or password");
  });

  it("should throw an error if password is wrong", async () => {
    const response = await request(app).post("/sessions").send({
      email,
      password: name
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid e-mail or password");
  });
});
