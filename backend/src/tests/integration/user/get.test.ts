import { sign } from "jsonwebtoken";
import request from "supertest";
import { userRepository } from "../../../repositories/";
import { orchestrator } from "../../../utils/orchestrator";

describe("GET /users", () => {
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
    token = sign({ id: user.id }, process.env.JWT_SECRET || "");
  });

  afterAll(async () => {
    await orchestrator.disconnect();
  });

  it("should not get user profile without token", async () => {
    const response = await request("http://localhost:3000").get(
      `/users/${userId}`
    );

    console.log("should not get user profile without token", response.body);

    expect(response.status).toBe(401);
  });

  it("should get user profile with valid token", async () => {
    const response = await request("http://localhost:3000")
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    console.log("should get user profile with valid token", response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe("test@example.com");
  });

  it("should get list of users with pagination", async () => {
    const response = await request("http://localhost:3000")
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .query({ page: 1, size: 10 });

    console.log("should get list of users with pagination", response.body);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.content)).toBe(true);
    expect(response.body).toHaveProperty("totalPages");
    expect(response.body).toHaveProperty("totalElements");
    expect(response.body).toHaveProperty("number");
  });
});
