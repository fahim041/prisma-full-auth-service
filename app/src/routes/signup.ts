import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const user = await prisma.user.create({ data: { email, username } });

  res.json({ res: user });
});

export { router as signupRouter };
