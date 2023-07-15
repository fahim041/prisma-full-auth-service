import express, { Request, Response } from 'express';
import { signupRouter } from './routes/signup';

const app = express();

app.use(express.json());

app.get('/api/ping', (req: Request, res: Response) => {
  res.send('server is running 22');
});

//routes
app.use(signupRouter);

export { app };
