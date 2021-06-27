const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const passport = require('passport');
const cors = require('cors');
const router = require('./router');

require('dotenv').config();

/* ------- DATABASE AND SESSION STORAGE SETUP -------
 *
 */

const db = require('./database');

db.sync();

/* ------- EXPRESS CONFIG -------
 *
 */

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5050', 'http://localhost:3000'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ------- SESSION SETUP -------
 *
 */

const sessionStore = new SequelizeStore({
  db: db,
  expiration: 1000 * 60 * 60 * 24,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    // proxy: true, // if you do SSL outside of node.
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

sessionStore.sync();

/* ------- PASSPORT CONFIG -------
 *
 */

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

/* ------- IMPORT ROUTES -------
 *
 */

app.use(router);

/* ------- ERROR HANDLER -------
 *
 */

app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
  }
  next();
});

/* ------- RUN SERVER -------
 *
 */

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    throw err;
  }
  console.log('Server started on port ' + process.env.PORT || 5000);
});
