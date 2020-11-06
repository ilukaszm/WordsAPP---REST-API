import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { user } from '../models';

export const userLogin = (req: Request, res: Response) => {
  res.redirect('/auth/user');
};

export const userRegister = async (req: Request, res: Response) => {
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
};

export const userLogout = (req: Request, res: Response) => {
  req.logout();
  res.redirect('/');
};

export const getUser = (req: Request, res: Response) => {
  const { user } = req;

  res.json(user);
};

export const userGoogleAuth = (req: Request, res: Response) => {
  res.redirect('/');
};

export const userFacebookAuth = (req: Request, res: Response) => {
  res.redirect('/');
};