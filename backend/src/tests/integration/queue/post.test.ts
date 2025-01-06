import { sign } from "jsonwebtoken";
import request from "supertest";
import { orchestrator } from "../../../helpers/orchestrator";
import { userRepository } from "../../../repositories/userRepository";

describe("POST /queue", () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    await orchestrator.waitForAllServices();
    await orchestrator.clearDatabase();
    const user = userRepository.create({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
    });
    user.hashPassword();
    await userRepository.save(user);

    userId = user.id;
    token = sign({ id: user.id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "1d",
    });
  });

  afterAll(async () => {
    await orchestrator.disconnect();
  });

  beforeEach(async () => {});

  it("should create a new queue successfully", async () => {
    const response = await request("http://localhost:3000")
      .post("/queue")
      .send({
        color: "#1273de",
        name: "teste",
        greetingMessage: "teste",
      })
      .set("Authorization", `Bearer ${token}`);

    console.log("should create a new queue successfully", response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.color).toBe("#1273de");
    expect(response.body.greetingMessage).toBe("teste");
    expect(response.body.name).toBe("teste");
  });

  it("should not create queue with duplicate name", async () => {
    // Create first queue
    await request("http://localhost:3000")
      .post("/queue")
      .send({
        color: "#1273de",
        name: "teste",
        greetingMessage: "teste",
      })
      .set("Authorization", `Bearer ${token}`);

    // Try to create duplicate
    const response = await request("http://localhost:3000")
      .post("/queue")
      .send({
        color: "#1273de",
        name: "teste",
        greetingMessage: "teste",
      })
      .set("Authorization", `Bearer ${token}`);
    console.log("should not create queue with duplicate name", response.body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should validate required fields", async () => {
    const response = await request("http://localhost:3000")
      .post("/queue")
      .send({
        color: "",
        greetingMessage: "",
      })
      .set("Authorization", `Bearer ${token}`);

    console.log("should validate required fields", response.body);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
