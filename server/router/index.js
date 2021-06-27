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

router.use('/api/auth', auth);

// route catch all (react router used on client)
router.get('/*', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('auth');
  } else {
    console.log('not auth');
  }
  res.sendFile(path.join(APP_DIR, 'index.html'));
});

module.exports = router;
