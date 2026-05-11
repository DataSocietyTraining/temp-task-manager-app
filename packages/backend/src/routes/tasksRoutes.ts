import { Router } from 'express';
import { createTask, listTasks, patchTask, removeTask } from '../controllers/tasksController';

const router = Router();

router.get('/', listTasks);
router.post('/', createTask);
router.patch('/:id', patchTask);
router.delete('/:id', removeTask);

export default router;
