import request from "supertest";

import { email, name, setUserId } from "@/tests/tests";
import { app } from "@/app";


describe("Users Controller", () => {
  it("should create a user successfully", async () => {
    const response = await request(app).post("/users").send({
      email,
      name,
      password: "123456"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(name);
    expect(response.body.email).toBe(email);

    setUserId(response.body.id);
  });


  it("should throw an error if no body is sent", async () => {
    const response = await request(app).post("/users").send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
  });

  it("should throw an error if name is too short", async () => {
    const response = await request(app).post("/users").send({
      name: "a",
      email,
      password: "123456"
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
    expect(response.body.issues).toHaveProperty("name");
  });

  it("should throw an error if name is too long", async () => {
    const response = await request(app).post("/users").send({
      name: "a".repeat(17),
      email,
      password: "123456"
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
    expect(response.body.issues).toHaveProperty("name");
  });

  it("should throw an error if email is invalid", async () => {
    const response = await request(app).post("/users").send({
      name,
      email: name,
      password: "123456"
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
    expect(response.body.issues).toHaveProperty("email");
  });

  it("should throw an error if password is too short", async () => {
    const response = await request(app).post("/users").send({
      name,
      email,
      password: "123"
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
    expect(response.body.issues).toHaveProperty("password");
  });

  it("should throw an error if password is too long", async () => {
    const response = await request(app).post("/users").send({
      name,
      email,
      password: "a".repeat(17)
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
    expect(response.body.issues).toHaveProperty("password");
  });
});
