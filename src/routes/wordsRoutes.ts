import { Router } from 'express';

import * as controller from '../controllers/wordsController';
import requireLogin from '../middlewares/requireLogin';
import validate from '../middlewares/validator';
import wordsValidationRules from '../validation/wordValidationRules';

const router = Router();

router.get('/', requireLogin, controller.getAllWords);
router.get('/id/:id', requireLogin, controller.getOneWord);
router.post('/', requireLogin, wordsValidationRules(), validate, controller.addWord);
router.put('/id/:id', requireLogin, wordsValidationRules(), validate, controller.updateOneWord);
router.delete('/id/:id', requireLogin, controller.removeOneWord);

export default router;
