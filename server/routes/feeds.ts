import { Router } from 'express';
import { feedController } from '../controllers/feed.ctrl.js';

const router = Router();

router.get('/:idx', feedController.get);
router.get('/', feedController.get);
router.post('/', feedController.insert);
router.delete('/:idx', feedController.delete);
router.put('/:idx', feedController.update);


export default router;