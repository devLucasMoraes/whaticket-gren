import { sign } from "jsonwebtoken";
import request from "supertest";
import { Queue } from "../../../entities/Queue";
import { queueRepository, userRepository } from "../../../repositories/";
import { orchestrator } from "../../../utils/orchestrator";

describe("GET /queue", () => {
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

  it("should get all queues", async () => {
    const response = await request("http://localhost:3000")
      .get("/queue")
      .set("Authorization", `Bearer ${token}`);

    console.log("should get all queues", response.body);

    expect(response.status).toBe(200);
  });
});
