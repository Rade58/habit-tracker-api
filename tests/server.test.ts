import request from "supertest";

import { app } from "../src/server.ts";

// not working, need to create setup

describe("Health Check", () => {
  it("should return OK status", async () => {
    const response = await request(app).get("/health").expect(200);

    expect(response.body.status).toBe("OK");
    expect(response.body.service).toBe("Habit Tracker api");
  });
});
