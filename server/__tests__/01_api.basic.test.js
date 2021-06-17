const { expect } = require('@jest/globals');
const axios = require('axios');

const URL = process.env.SERVER_ADDRESS;

const base_user = {
  username: 'john',
  email: 'john@gmail.com',
  password: 'pass',
};

describe('Basic API Tests', () => {
  test('Registration Single', async () => {
    await axios
      .post(URL + '/api/auth/register', base_user)
      .then((res) => {
        expect(res.status).toBe(200);
      })
      .catch((err) => {
        expect(err).toEqual(null);
      });
  });

  test('Sign In', async () => {
    await axios
      .post(URL + '/api/auth/signin', base_user)
      .then((res) => {
        expect(res.status).toBe(200);
      })
      .catch((err) => {
        expect(err).toEqual(null);
      });
  });
});
