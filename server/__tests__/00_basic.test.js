const { expect } = require('@jest/globals');
const axios = require('axios');

const db = require('../database');
const URL = process.env.SERVER_ADDRESS;

describe('Basic Testing Functionality', () => {
  test('Test Harness Functionality', () => {
    expect(2 + 2).toBe(4);
  });

  test('Axios Dependency Installed', async () => {
    await axios
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .then((res) => {
        expect(res.data).not.toEqual(null);
      })
      .catch((err) => {
        expect(err).toEqual(null);
      });
  });

  test('Test Server Running', async () => {
    await axios
      .get(URL + '/api/check')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.msg).toEqual('We gucci');
      })
      .catch((err) => {
        expect(err).toEqual(null);
      });
  });

  test('Database Availability', async () => {
    await db
      .authenticate()
      .then(() => {
        expect(true).toEqual(true);
      })
      .catch((err) => {
        expect(err).toEqual(null);
      });
  });
});
