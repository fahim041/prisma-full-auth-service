import { app } from './app';

const PORT = 3000 || process.env.PORT;

const start = async () => {
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};

start();
