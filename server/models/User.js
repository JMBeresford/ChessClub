const { DataTypes } = require('sequelize');
const db = require('../database');

const User = db.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'compositeUserIndex', // user AND/OR email cannot be the same across any 2 users
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'compositeUserIndex', // user AND/OR email cannot be the same across any 2 users
  },
  id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
