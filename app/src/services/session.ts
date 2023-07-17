import prisma from '@prisma/db';

export class Session {
  static async init(token: string, user: string) {
    const existingSession = await prisma.session.findUnique({
      where: { token },
    });

    if (!existingSession) {
      const newSession = await prisma.session.create({
        data: {
          token,
          user: { connect: { id: Number(user) } },
        },
      });
    } else {
      //increment view count
      await prisma.session.update({
        where: { token },
        data: { views: existingSession.views + 1 },
      });
    }
  }
}
