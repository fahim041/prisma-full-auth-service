import prisma from '@dbclient/db';

afterAll(async () => {
  const userDelete = prisma.user.deleteMany();
  const sessionDelete = prisma.session.deleteMany();

  await prisma.$transaction([userDelete, sessionDelete]);

  await prisma.$disconnect();
});
