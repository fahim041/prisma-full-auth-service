import prisma from '@dbclient/db';

beforeAll(async () => {});

beforeEach(async () => {
  const sessionDelete = prisma.session.deleteMany();
  const userDelete = prisma.user.deleteMany();
  await prisma.$transaction([sessionDelete, userDelete]);
  await prisma.$disconnect();
});

afterAll(async () => {
  const sessionDelete = prisma.session.deleteMany();
  const userDelete = prisma.user.deleteMany();

  await prisma.$transaction([sessionDelete, userDelete]);

  await prisma.$disconnect();
});
