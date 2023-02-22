import { Router } from 'express';
import { tokenMiddleware } from '../middlewares/token.js';
import { userController } from '../controllers/users.ctrl.js';

const router = Router();


router.post('/', userController.create);
router.delete('/:user_id', tokenMiddleware.check, userController.delete);
router.get('/:user_id', userController.get);


export default router;