const express = require('express');
const router = express.Router();
const auth = require('./auth');

router.get('/check', (req, res) => {
  res.status(200).json({ msg: 'We gucci' });
});

router.use('/auth', auth);

module.exports = router;
