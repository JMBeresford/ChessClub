const { expect, describe } = require('@jest/globals');
const axios = require('axios');
const { beforeEach, afterEach } = require('jest-circus');
const User = require('../models/User');

const URL = process.env.SERVER_ADDRESS;

// Jest runs the different test suites in parallel, so we must use distinct user objects
const base_user = {
  username: 'roger',
  email: 'roger@gmail.com',
  password: 'pass',
};

describe('Signin Basic', () => {
  test('Empty Username', async () => {
    let false_user = { ...base_user, username: '' };
    await axios
      .post(URL + '/api/auth/signin', false_user)
      .then((res) => {
        expect(res).toEqual(null);
      })
      .catch((err) => {
        expect(err.response.status).toBe(400);
      });
  });

  test('Empty Password', async () => {
    let false_user = { ...base_user, password: '' };
    await axios
      .post(URL + '/api/auth/signin', false_user)
      .then((res) => {
        expect(res).toEqual(null);
      })
      .catch((err) => {
        expect(err.response.status).toBe(400);
      });
  });
});
