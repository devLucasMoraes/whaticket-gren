import { sign } from "jsonwebtoken";
import request from "supertest";
import { Queue } from "../../../entities/Queue";
import { orchestrator } from "../../../helpers/orchestrator";
import { queueRepository } from "../../../repositories/queueRepository";
import { userRepository } from "../../../repositories/userRepository";

describe("DELETE /queue", () => {
  let token: string;
  let userId: string;
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

    userId = user.id;
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

  it("should delete queue successfully", async () => {
    const response = await request("http://localhost:3000")
      .delete(`/queues/${queue.id}`)
      .set("Authorization", `Bearer ${token}`);

    console.log("should delete queue successfully", response.body);

    expect(response.status).toBe(204);
  });

  it("should not delete queue with not exist queue", async () => {
    const response = await request("http://localhost:3000")
      .delete("/queues/999999")
      .set("Authorization", `Bearer ${token}`);

    console.log("should not delete queue with invalid id", response.body);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
