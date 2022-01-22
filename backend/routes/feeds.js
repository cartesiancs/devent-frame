import { Router } from 'express';
const router = Router();

import { getFeed, insertFeed } from '../controllers/feed.ctrl.js';


router.get('/:idx', getFeed);
router.post('/', insertFeed);


export default router;