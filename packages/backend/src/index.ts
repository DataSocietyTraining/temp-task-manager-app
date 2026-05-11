import app from './app';
import { config } from './config';

export default app;

app.listen(config.port, () => {
  console.log(`Reference API listening on http://localhost:${config.port}`);
  console.log(`  GET  /api/health`);
  console.log(`  REST /api/tasks`);
});
