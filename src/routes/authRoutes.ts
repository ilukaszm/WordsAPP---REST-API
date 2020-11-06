import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

import { user } from '../models';

const router = Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.redirect('/auth/user');
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const userExists = await user.findOne({ where: { email } });

  if (!userExists) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await user.create({
      data: { email, password: hashedPassword },
    });

    const { password: pass, ...result } = newUser;

    res.json(result);
  } else {
    res.json({ error: 'User exists' });
    res.status(403);
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/user', (req, res) => {
  const user = req.user;

  res.json(user);
});

export default router;
