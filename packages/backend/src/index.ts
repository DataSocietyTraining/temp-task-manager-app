// ─────────────────────────────────────────────
//  Application Entry Point
//
//  TODO:
//    1. Create an Express app
//    2. Apply middleware (cors, express.json)
//    3. Mount task and assignee routers under /api
//    4. Apply the global error handler
//    5. Start listening on config.port
// ─────────────────────────────────────────────

import express from 'express';
import cors from 'cors';
import { config } from './config';
// import taskRoutes from './routes/taskRoutes';
// import assigneeRoutes from './routes/assigneeRoutes';
// import { errorHandler } from './middleware/errorHandler';

const app = express();

// TODO: register middleware

// TODO: mount routes

// TODO: register error handler

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});

export default app;
