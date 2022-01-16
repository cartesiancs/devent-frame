import { Router } from 'express';
const router = Router();

import { index } from '../controllers/feed.ctrl.js';


router.get('/', index);


export default router;