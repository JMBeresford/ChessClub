const express = require('express');
const router = express.Router();
const auth = require('./auth');
const path = require('path');

// Set static folder
const APP_DIR =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'public')
    : path.join(__dirname, '..', '..', 'client', 'build');

router.use(express.static(APP_DIR));

router.get('/check', (req, res) => {
  res.status(200).json({ msg: 'We gucci' });
});

router.get('/api/authenticate', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

router.use('/api/auth', auth);

// route catch all (react router used on client)
router.get('/*', (req, res) => {
  res.sendFile(path.join(APP_DIR, 'index.html'));
});

module.exports = router;
