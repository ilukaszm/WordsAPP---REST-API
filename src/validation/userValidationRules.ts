import { body } from 'express-validator';

const userValidationRules = () => {
  return [
    body('email').isEmail().withMessage('email must have an email format'),
    body('password').isLength({ min: 5 }).withMessage('passoword must have at least 5 characters'),
  ];
};

export default userValidationRules;
