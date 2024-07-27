import { Router } from 'express';
import { userValidator } from '../middleware/validator';
import { loginUser, registerUser } from '../controllers/authContoller';

const router = Router();

router.post('/register', userValidator, registerUser);
router.post('/login', userValidator, loginUser);

export default router;
