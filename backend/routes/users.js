import { Router } from 'express';
const router = Router();

import { check } from '../middlewares/token.js';


import { create, deleteUserInfo } from '../controllers/users.ctrl.js';


router.post('/', create);
router.delete('/:user_id', check, deleteUserInfo);


export default router;