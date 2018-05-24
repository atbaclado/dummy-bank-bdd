const express = require('express');
const passport = require('../config/passport');
const router = require('./auth');

router.use(passport.initialize());

// authentication using google account 
router.get('/auth/google',
  passport.authenticate('google', { 
    scope:
      [ 'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read' 
      ] 
    }
));
 
router.get( '/auth/google/callback', 
  passport.authenticate( 'google', {
    failureRedirect: '/auth/google/failure'
  }),
  function(req, res) {
    req.session.currentUser = req.user.email;
    res.redirect('/profile');
  }
);

module.exports = router;