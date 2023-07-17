import express, { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { excludeFields } from '../utils/exclude-fields';

const router = express.Router();

router.get('/api/users/currentuser', (req: Request, res: Response) => {
  //checking if session has jwt value
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload: JwtPayload = <JwtPayload>(
      jwt.verify(req.session.jwt, process.env.JWT_KEY!)
    );
    res.send({ currentUser: excludeFields({ fields: ['iat'] }, payload) });
  } catch (err) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
