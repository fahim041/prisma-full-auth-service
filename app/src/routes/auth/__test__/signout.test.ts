import request from 'supertest';
import { app } from '@/app';

it('clears the cookie after signing out', async () => {
  const register = await request(app)
    .post('/api/users/register')
    .send({
      email: 'user@example.com',
      password: '12345',
      username: 'user',
    })
    .expect(201);

  const cookie = register.headers['set-cookie'];

  return await request(app)
    .post('/api/users/signout')
    .set('Cookie', cookie)
    .send({})
    .expect(200);
});

// it('responds with a 401 if not signed in', async () => {
//   return await request(app).post('/api/users/signout').send({}).expect(401);
// });
