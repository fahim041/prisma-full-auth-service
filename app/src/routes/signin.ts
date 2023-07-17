import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '@middlewares/validate-request';
import prisma from '@prisma/db';
import { BadRequestError } from '@errors/bad-request-error';
import { Password } from '@services/password';
import { excludeFields } from '@utils/exclude-fields';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    //generate jwt
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // store it in session
    req.session = {
      jwt: userJwt,
    };

    res.json({
      data: excludeFields(
        { fields: ['password', 'updatedAt', 'createdAt'] },
        existingUser
      ),
    });
  }
);

export { router as signinRouter };
