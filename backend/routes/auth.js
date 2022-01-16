import { Router } from 'express';
const router = Router();


import { login } from '../controllers/auth.ctrl.js';


router.post('/login', login);


export default router;