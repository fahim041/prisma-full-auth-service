import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { currentUser } from './current-user';
import { Session } from '@services/session';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError('Not Authorized');
  }

  req.session = req.session || {};

  Session.init(req.session?.jwt, req.currentUser!.id);

  next();
};

export const authorized = [currentUser, requireAuth];
