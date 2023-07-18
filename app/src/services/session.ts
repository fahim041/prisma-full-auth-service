import prisma from '@dbclient/db';

export class Session {
  static async init(token: string, user: string) {
    const existingSession = await prisma.session.findUnique({
      where: { token },
    });

    if (!existingSession) {
      const currentUser = await prisma.user.findUnique({
        where: { id: Number(user) },
      });
      currentUser &&
        (await prisma.session.create({
          data: {
            token,
            userId: currentUser.id,
          },
        }));
    } else {
      //increment view count
      await prisma.session.update({
        where: { token },
        data: { views: existingSession.views + 1 },
      });
    }
  }
}
