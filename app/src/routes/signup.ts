import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import prisma from '@dbclient/db';
import { Password } from '@services/password';
import { excludeFields } from '@utils/exclude-fields';
import { BadRequestError } from '@errors/bad-request-error';
import { validateRequest } from '@middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/register',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
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

    res.status(201).json({
      data: excludeFields({ fields: ['password', 'updatedAt'] }, user),
    });
  }
);

export { router as signupRouter };
