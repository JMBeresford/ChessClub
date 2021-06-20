const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('passport');

router.post('/register', async (req, res) => {
  let new_user = req.body;
  let saltRounds = 10;

  if (
    !new_user ||
    !new_user.email ||
    !new_user.username ||
    !new_user.password
  ) {
    res.status(400).json({ msg: 'Missing data from request' });
    return;
  }

  bcrypt.hash(new_user.password, saltRounds, (err, hash) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    new_user.password = hash;

    User.create(new_user)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        let errors = { email: false, username: false };
        if (err && err.errors) {
          for (let error of err.errors) {
            if (error.type === 'unique violation') {
              if (error.path === 'username') errors.username = true;
              if (error.path === 'email') errors.email = true;
            }
          }
        }

        res.status(409).json(errors);
      });
  });
});

router.post('/signin', passport.authenticate('local'), (req, res) => {
  res.status(200).json(req.user);
});

// deprecated
// router.post('/signin', async (req, res) => {
//   const credentials = {
//     username: req.body.username,
//     password: req.body.password,
//   };

//   if (!credentials.username || !credentials.password) {
//     res.status(400).json({ msg: 'Missing username or password' });
//     return;
//   }

//   const user = await User.findOne({
//     where: { username: credentials.username },
//   }).catch((err) => {
//     console.error(err);
//   });

//   if (!user) {
//     res
//       .status(400)
//       .json({ msg: `User with username ${credentials.username} not found` });
//     return;
//   }

//   bcrypt.compare(credentials.password, user.password, (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ err });
//     }

//     if (!result) {
//       res.status(401).json({ msg: 'Incorrect Password' });
//     }

//     let token = 'Welcome to the salty spitoon';

//     res.status(200).json({ token });
//   });
// });

module.exports = router;
