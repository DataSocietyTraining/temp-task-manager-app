import express from 'express';
import cors from 'cors';
import { config } from './config';
import tasksRoutes from './routes/tasksRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'task-manager-reference-api' });
});

app.use('/api/tasks', tasksRoutes);

app.use(errorHandler);

export default app;
