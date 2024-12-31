import request from "supertest";
import { orchestrator } from "../../../helpers/orchestrator";
import { userRepository } from "../../../repositories/userRepository";

describe("POST /signup", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  afterAll(async () => {
    await orchestrator.disconnect();
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it("should create a new user successfully", async () => {
    const response = await request("http://localhost:3000")
      .post("/signup")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "123456",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("John Doe");
    expect(response.body.email).toBe("john@example.com");
    //expect(response.body).not.toHaveProperty("password");
  });

  it("should not create user with duplicate email", async () => {
    // Create first user
    await request("http://localhost:3000").post("/signup").send({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    });

    // Try to create duplicate
    const response = await request("http://localhost:3000")
      .post("/signup")
      .send({
        name: "John Doe 2",
        email: "john@example.com",
        password: "123456",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should validate required fields", async () => {
    const response = await request("http://localhost:3000")
      .post("/signup")
      .send({
        name: "",
        email: "",
        password: "",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
