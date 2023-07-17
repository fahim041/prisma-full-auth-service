import express, { Request, Response } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { signupRouter } from '@routes/signup';
import { errorHandler } from '@middlewares/error-handler';
import { NotFoundError } from '@errors/not-found-error';
import { signinRouter } from '@routes/signin';
import { currentUserRouter } from '@routes/current-user';
import { signoutRouter } from '@routes/signout';

const app = express();
app.set('trust proxy', true);
app.use(express.json());

//cookie session middleware
app.use(
  cookieSession({
    signed: false,
    secure: false,
    maxAge: 5 * 60 * 1000, // 1 minute
  })
);

//app routes
app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(signoutRouter);

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
