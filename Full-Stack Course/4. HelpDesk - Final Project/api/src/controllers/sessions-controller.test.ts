import request from "supertest";

import { email, name, password, setJwtToken } from "@/tests/tests";
import { app } from "@/app";


describe("Sessions Controller", () => {
  it("should login successfully", async () => {
    const response = await request(app).post("/sessions").send({
      email,
      password
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");

    setJwtToken(response.body.token);
  });

  it("should throw an error if email is invalid", async () => {
    const response = await request(app).post("/sessions").send({
      email: name,
      password
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("issues");
    expect(response.body.issues).toHaveProperty("email");
  });

  it("should throw an error if email is wrong", async () => {
    const response = await request(app).post("/sessions").send({
      email: "wrongtestuser@test.com",
      password
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Credenciais inválidas");
  });

  it("should throw an error if password is wrong", async () => {
    const response = await request(app).post("/sessions").send({
      email,
      password: name
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Credenciais inválidas");
  });
});
