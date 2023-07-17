import { app } from './app';
import prismaClient from '../prisma/db';
import { DatabaseConnectionError } from './errors/database-connection-error';

const PORT = 3000 || process.env.PORT;

const start = async () => {
  //checking env variables are set
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  //checking database connection before app is starting
  const prisma = prismaClient;
  try {
    await prisma.$connect();
  } catch (error) {
    throw new DatabaseConnectionError();
  } finally {
    await prisma.$disconnect();
  }

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
};

start();
