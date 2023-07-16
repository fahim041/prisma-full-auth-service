import { Request, Response, NextFunction } from 'express';

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('erorr', err);
  res.status(400).send({ message: err.message });
};
