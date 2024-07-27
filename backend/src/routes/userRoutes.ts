import { Router } from 'express';
import auth from '../middleware/auth';
import { getUsers } from '../controllers/userController';

const router = Router();

router.get('/users', auth, getUsers);

export default router;
