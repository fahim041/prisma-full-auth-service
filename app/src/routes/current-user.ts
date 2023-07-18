import express, { Request, Response } from 'express';
import { authorized } from '@middlewares/require-auth';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  authorized,
  (req: Request, res: Response) => {
    res.status(200).json({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
