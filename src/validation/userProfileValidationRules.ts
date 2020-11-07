import { body } from 'express-validator';

const userValidationRules = () => {
  return [
    body('password')
      .isLength({ min: 5 })
      .optional()
      .withMessage('passoword must have at least 5 characters'),
    body('avatarURL').isURL().optional().withMessage('avatarURL must be URL address'),
    body('gameSound').isBoolean().optional().withMessage('gameSound must be boolean'),
    body('gamePoints').isInt().optional().withMessage('gamePoints must be integer'),
    body('numberOfLevels').isInt().optional().withMessage('numberOfLevels must be integer'),
  ];
};

export default userValidationRules;
