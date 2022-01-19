import { Router } from 'express';
const router = Router();

import { getFeed } from '../controllers/feed.ctrl.js';


router.get('/:idx', getFeed);


export default router;