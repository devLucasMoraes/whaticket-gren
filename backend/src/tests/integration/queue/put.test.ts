import { sign } from "jsonwebtoken";
import request from "supertest";
import { Queue } from "../../../entities/Queue";
import { queueRepository, userRepository } from "../../../repositories/";
import { orchestrator } from "../../../utils/orchestrator";

describe("PUT /queue", () => {
  let token: string;
  let queue: Queue;

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

    token = sign({ id: user.id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "1d",
    });

    queue = queueRepository.create({
      color: "#1273de",
      name: "teste",
      greetingMessage: "teste",
    });
    await queueRepository.save(queue);
  });

  afterAll(async () => {
    await orchestrator.disconnect();
  });

  beforeEach(async () => {});

  it("should update a queue successfully", async () => {
    const response = await request("http://localhost:3000")
      .put(`/queues/${queue.id}`)
      .send({
        color: "#1219de",
        name: "queue updated",
        greetingMessage: "message updated",
      })
      .set("Authorization", `Bearer ${token}`);

    console.log("should update a queue successfully", response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.color).toBe("#1219de");
    expect(response.body.greetingMessage).toBe("message updated");
    expect(response.body.name).toBe("queue updated");
  });

  it("should not update queue with duplicate name", async () => {
    // Create first queue
    const { body } = await request("http://localhost:3000")
      .post("/queue")
      .send({
        color: "#1273de",
        name: "teste",
        greetingMessage: "teste",
      })
      .set("Authorization", `Bearer ${token}`);

    // Try to create duplicate
    const response = await request("http://localhost:3000")
      .put(`/queues/${body.id}`)
      .send({
        color: "#1273de",
        name: "queue updated",
        greetingMessage: "teste",
      })
      .set("Authorization", `Bearer ${token}`);
    console.log("should not update queue with duplicate name", response.body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should validate required fields", async () => {
    const response = await request("http://localhost:3000")
      .put(`/queues/${queue.id}`)
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
