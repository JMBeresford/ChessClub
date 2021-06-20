const express = require('express');
const session = require('express-session');
const db = require('./database');
const passport = require('passport');

module.exports = async () => {
  let server;
  const app = express();
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  // passport config
  require('./config/passport')(passport);

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret',
      resave: true,
      saveUninitialized: true,
    })
  );

  // passport session middleware
  app.use(passport.initialize());
  app.use(passport.session());

  const router = require('./router');
  app.use('/api', router);

  await db
    .authenticate()
    .then(() => {})
    .catch((err) => {
      console.error(err);
    });

  await db
    .sync({ force: true })
    .then(() => {})
    .catch((err) => {
      console.error(err);
    });

  await new Promise(function (resolve) {
    server = app.listen(0, '127.0.0.1', function () {
      let address = server.address();
      console.log(` Server running on '${JSON.stringify(address)}'...`);
      resolve();
    });
  });

  let address = server.address();
  global.server = server;
  process.env.SERVER_ADDRESS = `http://${address.address}:${address.port}`;
};
