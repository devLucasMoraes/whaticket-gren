import { sign } from "jsonwebtoken";
import request from "supertest";
import { Queue } from "../../../entities/Queue";
import { queueRepository, userRepository } from "../../../repositories";
import { orchestrator } from "../../../utils/orchestrator";

describe("POST /whatsapp", () => {
  let token: string;
  let userId: string;
  let queue: Queue;
  let queue2: Queue;

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
  });

  afterAll(async () => {
    await orchestrator.disconnect();
  });

  beforeEach(async () => {});

  it("should create a new whatsapp successfully", async () => {
    const response = await request("http://localhost:3000")
      .post("/whatsapp")
      .send({
        farewellMessage: "teste",
        greetingMessage: "teste",
        isDefault: false,
        name: "teste",
        queueIds: [],
      })
      .set("Authorization", `Bearer ${token}`);

    console.log("should create a new whatsapp successfully", response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.farewellMessage).toBe("teste");
    expect(response.body.greetingMessage).toBe("teste");
    expect(response.body.isDefault).toBe(true);
    expect(response.body.name).toBe("teste");
    expect(response.body.queues).toStrictEqual([]);
  });

  it("should create a new whatsapp with queue successfully", async () => {
    const response = await request("http://localhost:3000")
      .post("/whatsapp")
      .send({
        farewellMessage: "teste",
        isDefault: false,
        name: "whatsapp with queue",
        queueIds: [queue.id],
      })
      .set("Authorization", `Bearer ${token}`);

    console.log(
      "should create a new whatsapp with queue successfully",
      response.body
    );
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.farewellMessage).toBe("teste");
    expect(response.body.isDefault).toBe(false);
    expect(response.body.name).toBe("whatsapp with queue");
    expect(response.body.queues).toStrictEqual([{ id: queue.id }]);
  });

  it("should not create a new whatsapp with two queues sem greetingMessage", async () => {
    const response = await request("http://localhost:3000")
      .post("/whatsapp")
      .send({
        farewellMessage: "teste",
        isDefault: false,
        name: "whatsapp with two queue",
        queueIds: [queue.id, queue2.id],
      })
      .set("Authorization", `Bearer ${token}`);

    console.log(
      "should not create a new whatsapp with two queues sem greetingMessage",
      response.body
    );
    expect(response.status).toBe(400);
  });

  it("should not create whatsapp with duplicate name", async () => {
    // Create first whatsapp
    await request("http://localhost:3000")
      .post("/whatsapp")
      .send({
        farewellMessage: "",
        greetingMessage: "",
        isDefault: false,
        name: "teste",
        queueIds: [],
      })
      .set("Authorization", `Bearer ${token}`);

    // Try to create duplicate
    const response = await request("http://localhost:3000")
      .post("/whatsapp")
      .send({
        farewellMessage: "",
        greetingMessage: "",
        isDefault: false,
        name: "teste",
        queueIds: [],
      })
      .set("Authorization", `Bearer ${token}`);
    console.log(
      "should not create whatsapp with duplicate name",
      response.body
    );
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  it("should validate required fields", async () => {
    const response = await request("http://localhost:3000")
      .post("/whatsapp")
      .send({
        farewellMessage: "",
        greetingMessage: "",
        isDefault: "",
        name: "",
        queueIds: [],
      })
      .set("Authorization", `Bearer ${token}`);

    console.log("should validate required fields", response.body);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
