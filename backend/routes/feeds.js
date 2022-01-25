import { Router } from 'express';
const router = Router();

import { getFeed, getFeedRange, insertFeed, deleteFeed, updateFeed } from '../controllers/feed.ctrl.js';


router.get('/:idx', getFeed);
router.get('/', getFeedRange);

router.post('/', insertFeed);
router.delete('/:idx', deleteFeed);
router.put('/:idx', updateFeed);


export default router;