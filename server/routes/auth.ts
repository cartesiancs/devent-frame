import { Router } from 'express';
const router = Router();

import { check } from '../middlewares/token.js';

import { login, me } from '../controllers/auth.ctrl.js';


router.post('/login', login);
router.get('/me', check, me);


export default router;