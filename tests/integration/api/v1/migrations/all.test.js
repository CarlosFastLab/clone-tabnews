import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("/api/v1/migrations should early return 405 if unexpected methods are used", async () => {
  const unavailableMethods = ["PATCH", "PUT", "DELETE", "HEAD", "OPTIONS"];

  for (const method of unavailableMethods) {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method,
    });
    expect(response.status).toBe(405);
  }

  const statusEndpointResponse = await fetch(
    "http://localhost:3000/api/v1/status",
  );

  const statusEndpointResponseBody = await statusEndpointResponse.json();

  expect(
    statusEndpointResponseBody.dependencies.database.opened_connections,
  ).toBeLessThanOrEqual(1);
});
