import { Response } from 'express';

import { word as wordModel } from '../models';
import { IGetUserAuthInfoRequest } from '../shared';

export const getAllWords = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { id } = req.user;
  const words = await wordModel.findMany({ where: { userId: id } });

  return res.status(200).send({ data: words });
};

export const getOneWord = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const wordFound = await wordModel.findOne({
    where: {
      userWord: {
        id: parseInt(id),
        userId,
      },
    },
  });

  return res.status(200).send({ data: wordFound });
};

export const addWord = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { id } = req.user;
  const { word, translation } = req.body;
  const newWord = await wordModel.create({
    data: {
      word,
      translation,
      userId: id,
    },
  });

  return res.status(201).send({ data: newWord, message: 'Word was created' });
};

export const removeOneWord = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  await wordModel.delete({
    where: {
      userWord: {
        id: parseInt(id),
        userId,
      },
    },
  });

  return res.status(200).send({ message: 'Word was removed.' });
};

export const updateOneWord = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const { word, translation }: { word: string; translation: string } = req.body;

  await wordModel.update({
    where: {
      userWord: {
        id: parseInt(id),
        userId,
      },
    },
    data: { word, translation },
  });

  return res.status(200).send({ message: 'Word was updated.' });
};
