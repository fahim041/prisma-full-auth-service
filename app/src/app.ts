import express, { NextFunction, Request, Response } from 'express';
require('./utils/async-error');
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(express.json());

app.use(signupRouter);

//ping the server for status
app.get('/api/ping', (req: Request, res: Response) => {
  res.send('server is up and running!');
});

//unknown route handler
app.get('*', () => {
  throw new NotFoundError();
});

//middleware to handle errors
app.use(errorHandler);

export { app };
