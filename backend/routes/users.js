import { Router } from 'express';
const router = Router();


import { create } from '../controllers/users.ctrl.js';


router.post('/', create);


export default router;