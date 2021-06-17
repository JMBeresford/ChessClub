const express = require('express');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  process.env.DB_URI =
    'sqlite::' + path.join(__dirname, 'database', 'db.sqlite');
}

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Set static folder
const APP_DIR =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'public')
    : path.join(__dirname, '..', 'client', 'public');

app.use(express.static(APP_DIR));

app.get('/', (req, res) => {
  res.sendFile(path.join(APP_DIR, 'index.html'));
});

const router = require('./router');

app.use('/api', router);

// RUN SERVER
const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log('Server started on port ' + PORT);
});
