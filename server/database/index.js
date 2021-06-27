const { Sequelize } = require('sequelize');
const path = require('path');

const db =
  process.env.NODE_ENV === 'test'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '/test_db.sqlite'),
        logging: false,
      })
    : new Sequelize(
        process.env.DB_URI ||
          'sqlite::' + path.join(__dirname, 'database', 'db.sqlite'),
        {
          dialect: process.env.DB_TYPE,
          storage: path.join(__dirname, '/db.sqlite'),
          logging: false,
        }
      );

module.exports = db;
