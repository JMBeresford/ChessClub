const { Sequelize } = require('sequelize');
const path = require('path');

const db =
  process.env.NODE_ENV === 'test'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '/test_db.sqlite'),
        logging: false,
      })
    : new Sequelize(process.env.DB_URI, {
        dialect: process.env.DB_TYPE,
        storage: path.join(__dirname, '/db.sqlite'),
      });

module.exports = db;
