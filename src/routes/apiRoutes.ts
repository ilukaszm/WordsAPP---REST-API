import { Router } from 'express';

import * as controller from '../controllers/wordsController';
import requireLogin from '../middlewares/requireLogin';

const router = Router();

router.get('/words', requireLogin, controller.getAllWords);
router.get('/words/id/:id', requireLogin, controller.getOneWord);
router.post('/words', requireLogin, controller.addWord);
router.put('/words/id/:id', requireLogin, controller.updateOneWord);
router.delete('/words/id/:id', requireLogin, controller.removeOneWord);

export default router;
