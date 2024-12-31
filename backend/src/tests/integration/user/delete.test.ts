import { sign } from "jsonwebtoken";
import request from "supertest";
import { orchestrator } from "../../../helpers/orchestrator";
import { userRepository } from "../../../repositories/userRepository";

describe("DELETE /users", () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  afterAll(async () => {
    await orchestrator.disconnect();
  });

  beforeEach(async () => {
    await orchestrator.clearDatabase();

    // Create a test user and generate token
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

  it("should delete user successfully", async () => {
    const response = await request("http://localhost:3000")
      .delete(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);

    // Verify user was deleted
    const verifyResponse = await request("http://localhost:3000")
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(verifyResponse.status).toBe(400);
  });

  it("should not delete user without authentication", async () => {
    const response = await request("http://localhost:3000").delete(
      `/users/${userId}`
    );

    expect(response.status).toBe(401);
  });

  it("should not delete other users", async () => {
    // Create another user
    const anotherUser = userRepository.create({
      name: "Another User",
      email: "another@example.com",
      password: "123456",
    });
    anotherUser.hashPassword();
    await userRepository.save(anotherUser);

    // Try to delete another user
    const response = await request("http://localhost:3000")
      .delete(`/users/${anotherUser.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
  });
});
