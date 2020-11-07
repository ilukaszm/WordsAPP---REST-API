import { body } from 'express-validator';

const wordValidationRules = () => {
  return [
    body('word')
      .isLength({ min: 2, max: 36 })
      .optional()
      .withMessage('word must have until 2 to 36 characters'),
    body('translation')
      .isLength({ min: 2, max: 36 })
      .optional()
      .withMessage('translation must have until 2 to 36 characters'),
  ];
};

export default wordValidationRules;
