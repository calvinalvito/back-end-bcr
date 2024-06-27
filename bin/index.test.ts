import request from 'supertest';
import app from './index';

describe('User Login', () => {
  it('should login with valid credentials', async () => {
    const loginData = {
      email: 'superadmin@gmail.com',
      password: 'superadmin'
    };

    console.log('Starting login test with data:', loginData);

    const response = await request(app)
      .post('/api/v1/login')
      .send(loginData)
      .set('Accept', 'application/json');

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    console.log('Response body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
  });

  it('should fail with invalid credentials', async () => {
    const loginData = {
      email: 'wrongemail@gmail.com',
      password: 'wrongpassword'
    };

    console.log('Starting login test with invalid data:', loginData);

    const response = await request(app)
      .post('/api/v1/login')
      .send(loginData)
      .set('Accept', 'application/json');

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    console.log('Response body:', response.body);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Email tidak ditemukan.');
  });
});
