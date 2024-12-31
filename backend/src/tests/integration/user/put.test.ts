import { sign } from "jsonwebtoken";
import request from "supertest";
import { orchestrator } from "../../../helpers/orchestrator";
import { userRepository } from "../../../repositories/userRepository";

describe("PUT /users", () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  afterAll(async () => {
    await orchestrator.disconnect();
  });

  beforeEach(async () => {
    await userRepository.clear();

    // Create a test user and generate token
    const user = userRepository.create({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
    });
    user.hashPassword();
    await userRepository.save(user);

    userId = user.id;
    token = sign({ id: user.id }, process.env.JWT_SECRET || "");
  });

  it("should update user profile successfully", async () => {
    const response = await request("http://localhost:3000")
      .put(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated Name",
        email: "updated@example.com",
        password: "123456",
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Name");
    expect(response.body.email).toBe("updated@example.com");
  });
});
