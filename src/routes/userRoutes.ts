import { Router } from 'express';
import passport from 'passport';

import * as controller from '../controllers/userController';
import validate from '../middlewares/validator';
import userValidationRules from '../validation/userValidationRules';
import userProfileValidationRules from '../validation/userProfileValidationRules';
import requireLogin from '../middlewares/requireLogin';

const router = Router();

router.post(
  '/auth/login',
  userValidationRules(),
  validate,
  passport.authenticate('local'),
  controller.userLogin,
);
router.post('/auth/register', userValidationRules(), validate, controller.userRegister);
router.get('/auth/logout', controller.userLogout);
router.get('/current_user', requireLogin, controller.getUser);
router.put(
  '/current_user',
  requireLogin,
  userProfileValidationRules(),
  validate,
  controller.updateUserProfile,
);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google'), controller.userGoogleAuth);
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', controller.userFacebookAuth);

export default router;
