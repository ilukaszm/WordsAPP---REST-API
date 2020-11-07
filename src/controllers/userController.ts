import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { user } from '../models';
import { IGetUserAuthInfoRequest } from '../shared';

export const userLogin = (req: Request, res: Response) => {
  res.status(200).send({ message: 'You are logged in.' });
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

    return res
      .status(200)
      .send({ data: result, message: 'Your account was created successfully.' });
  }
  return res.status(403).send({ error: 'User exists!' });
};

export const userLogout = (req: Request, res: Response) => {
  req.logout();
  return res.status(200).send({ message: 'You are logged out.' });
};

export const getUser = (req: Request, res: Response) => {
  const { user } = req;

  return res.status(200).send({ data: user });
};

export const userGoogleAuth = (req: Request, res: Response) => {
  res.status(200).send({ message: 'You are logged in.' });
};

export const userFacebookAuth = (req: Request, res: Response) => {
  res.status(200).send({ message: 'You are logged in.' });
};

export const updateUserProfile = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { id } = req.user;

  type RequestBody = {
    password: string;
    email: string;
    avatarURL: string;
    gameSound: boolean;
    gamePoints: number;
    numberOfLevels: number;
  };

  const { password, avatarURL, gameSound, gamePoints, numberOfLevels }: RequestBody = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await user.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
      avatarURL,
      gameSound,
      gamePoints,
      numberOfLevels,
    },
  });

  return res.status(200).send({ message: 'Word was updated.' });
};
