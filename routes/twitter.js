const express = require('express');
const passport = require('../config/passport');
const router = require('./auth');

router.use(passport.initialize());

// authentication using twitter accounts 
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/'
  }),
  function(req, res) {
    req.session.currentUser = req.user.email;
    res.redirect('/profile');
  }
);

module.exports = router;