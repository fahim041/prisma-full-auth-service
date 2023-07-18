import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return await request(app)
    .post('/api/users/register')
    .send({
      email: 'user@example.com',
      password: '12345',
      username: 'user',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return await request(app)
    .post('/api/users/register')
    .send({
      email: 'useru.com',
      password: 'password',
      username: 'user',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return await request(app)
    .post('/api/users/register')
    .send({
      email: 'user@example.com',
      password: '1',
      username: 'user',
    })
    .expect(400);
});
