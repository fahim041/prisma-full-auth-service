import express from 'express';
import { signupRouter } from './routes/signup';

const app = express();

app.use(express.json());

//routes
app.use(signupRouter);

export { app };
