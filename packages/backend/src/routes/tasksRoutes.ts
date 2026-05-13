import { Router } from 'express';
import { listTasks } from '../controllers/tasksController';

const router = Router();

// GET is wired so learners can confirm the backend and frontend are connected.
router.get('/', listTasks);

// GET    /api/tasks
// POST   /api/tasks
// GET    /api/tasks/:id
// PUT    /api/tasks/:id
// DELETE /api/tasks/:id

// TODO: add route definitions here

export default router;
