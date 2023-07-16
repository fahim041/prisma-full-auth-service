import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import prismaClient from '../../prisma/db';
import { Password } from '../services/password';
import { excludeFields } from '../services/exclude-fields';

const router = express.Router();
const prisma = prismaClient;

router.post(
  '/api/users/register',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error('Invalid email or password!');
    }

    // const { username, email, password } = req.body;
    // const hashedPassword = await Password.toHash(password);

    // const user = await prisma.user.create({
    //   data: { email, username, password: hashedPassword },
    // });

    // res.json({
    //   data: excludeFields({ fields: ['password', 'updatedAt'] }, user),
    // });

    res.send({});
  }
);

export { router as signupRouter };
