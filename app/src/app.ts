import express, { NextFunction, Request, Response } from 'express';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(express.json());

app.use(signupRouter);

app.get('/api/ping', (req: Request, res: Response) => {
  res.send('server is up and running!');
});

//middleware to handle errors
app.use(errorHandler);

export { app };
