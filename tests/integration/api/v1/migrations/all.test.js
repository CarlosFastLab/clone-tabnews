import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("/api/v1/migrations should early return 405 if unexpected methods are used", async () => {
  const unavailableMethods = ["PATCH", "PUT", "DELETE", "HEAD", "OPTIONS"];

  unavailableMethods.forEach(async (method) => {
    const response = await fetch("http://localhost:3000/api/v1/migrations", {
      method,
    });
    expect(response.status).toBe(405);
  });
});
