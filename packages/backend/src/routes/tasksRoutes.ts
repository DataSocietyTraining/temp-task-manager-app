import { Router } from 'express';


const router = Router();

// GET is wired so learners can confirm the backend and frontend are connected.
// GET    /api/tasks
// POST   /api/tasks
// GET    /api/tasks/:id
// PUT    /api/tasks/:id
// DELETE /api/tasks/:id




import { listTasks, createTask, patchTaskStatus, patchTask } from '../controllers/tasksController';
router.get('/', listTasks);
router.post('/api/tasks', createTask);
router.patch('/api/tasks/:id/status', patchTaskStatus);
router.patch('/api/tasks/:id', patchTask);

export default router;
