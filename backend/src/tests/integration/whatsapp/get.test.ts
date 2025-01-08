import { sign } from "jsonwebtoken";
import request from "supertest";
import { userRepository } from "../../../repositories/";
import { orchestrator } from "../../../utils/orchestrator";

describe("GET /whatsapp", () => {
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

  it("should get whatsapp", async () => {
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

    const newWhatsapp = response.body;

    const response2 = await request("http://localhost:3000")
      .get(`/whatsapp/${newWhatsapp.id}`)
      .set("Authorization", `Bearer ${token}`);

    console.log("should get whatsapps", response2.body);

    expect(response2.status).toBe(200);
  });
});
