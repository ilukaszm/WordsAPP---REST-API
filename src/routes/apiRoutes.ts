import { Router } from 'express';

import * as controller from '../controllers/wordsController';

const router = Router();

router.get('/words', controller.getAllWords);
router.post('/words', controller.addWord);
router.get('/words/id/:id', controller.getOneWord);

export default router;
