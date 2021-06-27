const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const User = require('../models/User');

const verifyCallback = (username, password, done) => {
  User.findOne({
    where: {
      [Op.or]: [{ username: username }, { email: username }],
    },
  })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      // check password hash
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;

        if (!result) {
          return done(null, false, { message: 'Incorrect password' });
        }

        let toRet = user.toJSON();

        delete toRet.password;

        return done(null, toRet);
      });
    })
    .catch((err) => {
      return done(err);
    });
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id: id },
  });

  if (!user) return done(true, false);

  return done(null, user.toJSON());
});
