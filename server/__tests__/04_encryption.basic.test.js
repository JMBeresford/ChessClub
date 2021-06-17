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
  // Use bcrypt to encrypt user passwords for storing in DB
  test.todo('Registration - Password Encrypted');
  test.todo('Sign In - Password Encrypted');
});
