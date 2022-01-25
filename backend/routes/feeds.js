import { Router } from 'express';
const router = Router();

import { getFeed, getFeedRange, insertFeed, deleteFeed } from '../controllers/feed.ctrl.js';


router.get('/:idx', getFeed);
router.get('/', getFeedRange);

router.post('/', insertFeed);
router.delete('/:idx', deleteFeed);


export default router;