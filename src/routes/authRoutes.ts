import { Router } from 'express';
import passport from 'passport';

import * as controller from '../controllers/authController';

const router = Router();

router.post('/login', passport.authenticate('local'), controller.userLogin);
router.post('/register', controller.userRegister);
router.get('/logout', controller.userLogout);
router.get('/user', controller.getUser);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), controller.userGoogleAuth);
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', controller.userFacebookAuth);

export default router;
