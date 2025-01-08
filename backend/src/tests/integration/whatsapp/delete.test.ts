import { sign } from "jsonwebtoken";
import request from "supertest";
import { Queue } from "../../../entities/Queue";
import { Whatsapp } from "../../../entities/Whatsapp";
import {
  queueRepository,
  userRepository,
  whatsappRepository,
} from "../../../repositories/";
import { orchestrator } from "../../../utils/orchestrator";

describe("DELETE /whatsapp", () => {
  let token: string;
  let queue: Queue;
  let queue2: Queue;
  let whatsapp: Whatsapp;

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
      color: "#19999e",
      name: "teste",
      greetingMessage: "teste",
    });

    queue2 = queueRepository.create({
      color: "#1273de",
      name: "teste2",
      greetingMessage: "teste2",
    });
    await queueRepository.save(queue);
    await queueRepository.save(queue2);

    whatsapp = whatsappRepository.create({
      farewellMessage: "teste",
      greetingMessage: "teste",
      isDefault: true,
      name: "test",
      queues: [],
    });

    await whatsappRepository.save(whatsapp);
  });

  afterAll(async () => {
    await orchestrator.disconnect();
  });

  beforeEach(async () => {});

  it("should delete whatsapp successfully", async () => {
    const response = await request("http://localhost:3000")
      .delete(`/whatsapp/${whatsapp.id}`)
      .set("Authorization", `Bearer ${token}`);

    console.log("should whatsapp queue successfully", response.body);

    expect(response.status).toBe(204);
  });

  it("should not delete whatsapp with not exist queue", async () => {
    const response = await request("http://localhost:3000")
      .delete("/whatsapp/999999")
      .set("Authorization", `Bearer ${token}`);

    console.log("should not delete queue with invalid id", response.body);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
