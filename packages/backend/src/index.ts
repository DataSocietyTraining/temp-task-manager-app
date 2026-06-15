import app from './app';
import { config } from './config';

export default app;

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Starter API listening on http://localhost:${config.port}`);
  console.log(`  GET  /api/health`);
  console.log(`  REST /api/tasks`);
});
