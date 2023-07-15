import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { Password } from '../services/password';
import { excludeFields } from '../services/exclude-fields';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/api/users/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await Password.toHash(password);

  const user = await prisma.user.create({
    data: { email, username, password: hashedPassword },
  });

  res.json({
    data: excludeFields({ fields: ['password', 'updatedAt'] }, user),
  });
});

export { router as signupRouter };
