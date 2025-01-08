import { sign } from "jsonwebtoken";
import request from "supertest";
import { userRepository } from "../../../repositories/";
import { orchestrator } from "../../../utils/orchestrator";

describe("DELETE /users", () => {
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

  it("should not delete user without authentication", async () => {
    const response = await request("http://localhost:3000").delete(
      `/users/${userId}`
    );

    expect(response.status).toBe(401);
  });

  it("should not delete whatsapp with not exist user", async () => {
    const response = await request("http://localhost:3000")
      .delete("/users/9398095a-10aa-4566-92a1-b2f0f7f817af")
      .set("Authorization", `Bearer ${token}`);

    console.log(
      "should not delete whatsapp with not exist user",
      response.body
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  it("should delete user successfully", async () => {
    const response = await request("http://localhost:3000")
      .delete(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    console.log("should delete user successfully", response.body);

    expect(response.status).toBe(204);

    const verifyResponse = await request("http://localhost:3000")
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(verifyResponse.status).toBe(400);
  });
});
