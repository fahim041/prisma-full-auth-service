import request from 'supertest';
import { app } from '@/app';

it('fails when a email that does not exist is supplied', async () => {
  return await request(app)
    .post('/api/users/signin')
    .send({
      email: 'user@example.com',
      password: '12345',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/register')
    .send({
      email: 'user@example.com',
      password: '12345',
      username: 'user',
    })
    .expect(201);

  return await request(app)
    .post('/api/users/signin')
    .send({
      email: 'user@example.com',
      password: '123456',
    })
    .expect(400);
});

it('fails when an incorrect email is supplied', async () => {
  await request(app)
    .post('/api/users/register')
    .send({
      email: 'user@example.com',
      password: '12345',
      username: 'user',
    })
    .expect(201);

  return await request(app)
    .post('/api/users/signin')
    .send({
      email: 'user1@example.com',
      password: '12345',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/register')
    .send({
      email: 'user@example.com',
      password: '12345',
      username: 'user',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'user@example.com',
      password: '12345',
    })
    .expect(200);
});
