const LocalStrategy = require('passport-local').Strategy;
const db = require('../database');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const User = require('../models/User');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
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
          done(err, false);
        });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: id },
    });

    if (!user) return done(true, false);

    return done(null, user);
  });
};
