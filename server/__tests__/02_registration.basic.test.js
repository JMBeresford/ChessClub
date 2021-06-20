const { expect } = require('@jest/globals');
const axios = require('axios');
const { beforeEach, afterEach } = require('jest-circus');
const User = require('../models/User');

const URL = process.env.SERVER_ADDRESS;

// Jest runs the different test suites in parallel, so we must use distinct user objects
const base_user = {
  username: 'samuel',
  email: 'samuel@gmail.com',
  password: 'pass',
};

const to_register = [
  { username: 'jeff', email: 'jeff@gmail.com', password: 'pass' },
  { username: 'karen', email: 'karen@gmail.com', password: 'pass' },
  { username: 'tim', email: 'tim@gmail.com', password: 'pass' },
  { username: 'terry', email: 'terry@gmail.com', password: 'pass' },
  { username: 'sally', email: 'sally@gmail.com', password: 'pass' },
  { username: 'sam', email: 'sam@gmail.com', password: 'pass' },
];

describe('Registration Basic', () => {
  beforeEach(async () => {
    await db.sync({ force: true }).catch((err) => {
      console.error(err);
    });
  });

  test('Registration Multiple', async () => {
    for (let new_user of to_register) {
      await axios
        .post(URL + '/api/auth/register', new_user)
        .then((res) => {
          expect(res.status).toBe(201);
        })
        .catch((err) => {
          expect(err).toEqual(null);
        });
    }
  });

  test('User already exists', async () => {
    await axios
      .post(URL + '/api/auth/register', base_user)
      .then((res) => {
        expect(res.status).toBe(201);
      })
      .catch((err) => {
        expect(err).toEqual(null);
      });

    await axios
      .post(URL + '/api/auth/register', base_user)
      .then((res) => {
        expect(res).toBe(null);
      })
      .catch((err) => {
        expect(err.response.status).toEqual(409);
        expect(err.response.data.username).toEqual(true);
        expect(err.response.data.email).toEqual(true);
      });
  });

  test('Empty Username', async () => {
    let false_user = {
      username: '',
      password: 'pass',
      email: 'blank@gmail.com',
    };
    await axios
      .post(URL + '/api/auth/register', false_user)
      .then((res) => {
        expect(res).toEqual(null);
      })
      .catch((err) => {
        expect(err.response.status).toBe(400);
      });
  });

  test('Empty Email', async () => {
    let false_user = {
      username: 'jerrod',
      password: 'pass',
      email: '',
    };
    await axios
      .post(URL + '/api/auth/register', false_user)
      .then((res) => {
        expect(res).toEqual(null);
      })
      .catch((err) => {
        expect(err.response.status).toBe(400);
      });
  });

  test('Empty Password', async () => {
    let false_user = {
      username: 'jerrod',
      password: '',
      email: 'jerrod@gmail.com',
    };
    await axios
      .post(URL + '/api/auth/register', false_user)
      .then((res) => {
        expect(res).toEqual(null);
      })
      .catch((err) => {
        expect(err.response.status).toBe(400);
      });
  });
});
