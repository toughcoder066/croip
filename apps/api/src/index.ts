import "dotenv/config";
import { buildApp } from "./app.js";

const port = Number(process.env.PORT) || 4000;
const host = process.env.HOST || "0.0.0.0";

async function main() {
  const app = await buildApp();

  try {
    await app.listen({ port, host });
    console.log(`🚀 CROIP Fastify API Gateway running at http://${host === "0.0.0.0" ? "localhost" : host}:${port}`);
    console.log(`📖 Interactive API documentation available at http://localhost:${port}/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
