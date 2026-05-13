import { Router } from 'express';
import { createTask, listTasks, patchTask, removeTask } from '../controllers/tasksController';

const router = Router();

// GET is wired so learners can confirm the backend and frontend are connected.
router.get('/', listTasks);
router.post('/', createTask);
router.patch('/:id', patchTask);
router.delete('/:id', removeTask);

// GET    /api/tasks
// POST   /api/tasks
// GET    /api/tasks/:id
// PUT    /api/tasks/:id
// DELETE /api/tasks/:id

export default router;
