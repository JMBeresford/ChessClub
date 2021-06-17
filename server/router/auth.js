const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const new_user = req.body;

  if (
    !new_user ||
    !new_user.email ||
    !new_user.username ||
    !new_user.password
  ) {
    res.status(400).json({ msg: 'Missing data from request' });
    return;
  }

  const user = await User.create(new_user, {
    fields: ['username', 'password', 'email'],
  }).catch((err) => {
    if (err.errors[0].type === 'unique violation') {
      res.status(409).json({ msg: 'Username or email already exists' });
      return;
    }
  });

  res.status(200).json(user);
});

router.post('/signin', async (req, res) => {
  const credentials = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!credentials.username || !credentials.password) {
    res.status(400).json({ msg: 'Missing username or password' });
    return;
  }

  const user = await User.findOne({
    where: { username: credentials.username },
  }).catch((err) => {
    console.error(err);
  });

  if (!user) {
    res
      .status(400)
      .json({ msg: `User with username ${credentials.username} not found` });
    return;
  }

  if (user.password !== credentials.password) {
    res.status(401).json({ msg: 'Incorrect Password' });
    return;
  }

  let token = 'Welcome to the salty spitoon';

  res.status(200).json({ token });
});

module.exports = router;
