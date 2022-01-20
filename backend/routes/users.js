import { Router } from 'express';
const router = Router();

import { check } from '../middlewares/token.js';


import { create, deleteUserInfo, getUserInfo } from '../controllers/users.ctrl.js';


router.post('/', create);
router.delete('/:user_id', check, deleteUserInfo);
router.get('/:user_id', getUserInfo);


export default router;