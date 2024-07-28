import { Router } from 'express';
import { registerValidator, loginValidator } from '../middleware/validator';
import { loginUser, registerUser, refreshAccessToken } from '../controllers/authContoller';

const router = Router();

router.post('/register', registerValidator, registerUser);
router.post('/login', loginValidator, loginUser);
router.post('/refresh-token', refreshAccessToken);

export default router;
