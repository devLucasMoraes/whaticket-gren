import { sign } from "jsonwebtoken";
import request from "supertest";
import { orchestrator } from "../../../helpers/orchestrator";
import { userRepository } from "../../../repositories/userRepository";

describe("GET /users", () => {
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

  it("should get user profile with valid token", async () => {
    const response = await request("http://localhost:3000")
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe("test@example.com");
  });

  it("should not get user profile without token", async () => {
    const response = await request("http://localhost:3000").get(
      `/users/${userId}`
    );

    expect(response.status).toBe(401);
  });

  it("should get list of users with pagination", async () => {
    const response = await request("http://localhost:3000")
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .query({ page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.users)).toBe(true);
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("page");
  });
});
