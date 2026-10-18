import { buildApp } from './app.js';
import { loadConfig } from './config.js';

const config = loadConfig();
const app = await buildApp({ config });

async function shutdown(signal: string): Promise<void> {
  app.log.info({ signal }, 'shutdown requested');
  const timeout = setTimeout(() => {
    app.log.fatal('graceful shutdown timed out');
    process.exit(1);
  }, config.SHUTDOWN_GRACE_MS).unref();
  await app.close();
  clearTimeout(timeout);
  process.exit(0);
}

process.once('SIGTERM', () => void shutdown('SIGTERM'));
process.once('SIGINT', () => void shutdown('SIGINT'));

await app.listen({ host: config.HOST, port: config.PORT });
