import { Router } from 'express';
const router = Router();

import { getFeed, getFeedRange, insertFeed } from '../controllers/feed.ctrl.js';


router.get('/:idx', getFeed);
router.get('/', getFeedRange);

router.post('/', insertFeed);


export default router;