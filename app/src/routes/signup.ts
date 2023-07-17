import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import prismaClient from '../../prisma/db';
import { Password } from '../services/password';
import { excludeFields } from '../utils/exclude-fields';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const hashedPassword = await Password.toHash(password);

    const user = await prisma.user.create({
      data: { email, username, password: hashedPassword },
    });

    //generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // store it in session
    req.session = {
      jwt: userJwt,
    };

    res.json({
      data: excludeFields({ fields: ['password', 'updatedAt'] }, user),
    });
  }
);

export { router as signupRouter };
