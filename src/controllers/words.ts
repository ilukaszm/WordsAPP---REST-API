import { Request, Response } from 'express';

import { word as wordModel } from '../models';

export const getAllWords = async (req: Request, res: Response) => {
  const words = await wordModel.findMany();

  res.json({ words });
};

export const addWord = async (req: Request, res: Response) => {
  const { word, translation } = req.body;

  const newWord = await wordModel.create({
    data: {
      word,
      translation,
    },
  });
  res.json(newWord);
};

export const getOneWord = async (req: Request, res: Response) => {
  const { id } = req.params;

  const wordFound = await wordModel.findOne({
    where: {
      id: parseInt(id),
    },
  });

  res.json(wordFound);
};
