import { Router } from 'express';
import { tokenMiddleware } from '../middlewares/token.js';
import { authController } from '../controllers/auth.ctrl.js';

const router = Router();

router.post('/login', authController.login);
router.get('/me', tokenMiddleware.check, authController.me);


export default router;