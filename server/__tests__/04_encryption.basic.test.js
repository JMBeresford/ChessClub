const { expect, describe } = require('@jest/globals');
const axios = require('axios');
const { beforeEach, afterEach } = require('jest-circus');
const User = require('../models/User');

const URL = process.env.SERVER_ADDRESS;

// Jest runs the different test suites in parallel, so we must use distinct user objects
const base_user = {
  username: 'kent',
  email: 'kent@gmail.com',
  password: 'pass',
};

describe('Encryption Basic', () => {
  beforeEach(() => {
    User.sync({ force: true });
  });

  // Use bcrypt to encrypt user passwords for storing in DB
  test('Registration - Password Encrypted', async () => {
    let res = await axios.post(URL + '/api/auth/register', base_user);

    expect(res.status).toBe(201);

    let user = await User.findOne({
      where: { username: base_user.username },
    });

    expect(user.password).not.toEqual(base_user.password);
  });
});
