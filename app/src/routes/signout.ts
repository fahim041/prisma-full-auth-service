import express, { Request, Response } from 'express';
import { authorized } from '../middlewares/require-auth';

const router = express.Router();

router.post('/api/users/signout', authorized, (req: Request, res: Response) => {
  req.session = null;

  res.send({});
});

export { router as signoutRouter };
