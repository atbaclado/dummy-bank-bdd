
// importing packages 
const bcrypt = require('bcrypt');
const express = require('express');

// importing own packages (./) for start destination
const User = require('../models').User;
const Account = require('../models').Account;
const database = require('../database');
const router = new express.Router();

router.post('/signup', function(req, res) {

	const email = req.body.email;
  const password = req.body.password;
  const confirmation = req.body.confirmation;

  // checks if the email and password already exists in the database
	User.findOne({ where: { email: email } }).then(function(user) {
    if (user !== null) {
      req.flash('signUpMessage', 'Email is already in use.');
      return res.redirect('/');
    }
		if (password !== confirmation) {
      req.flash('signUpMessage', 'Passwords do not match.');
      return res.redirect('/');
    }
        
    // bcrypting password for security purposes
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    // creates the account and saves it to the database
    database.transaction(function(t) {
      return User.create({
        email: email,
        password: hashedPassword,
        salt: salt
      }, { 
        transaction: t 
      }).then(function(user) {
        return Account.create({
          balance: 0,
          user_id: user.id
        }, { 
          transaction: t 
        });
      });
    }).then(function() {
      req.flash('statusMessage', 'Signed up successfully!');
      req.session.currentUser = req.body.email;
      res.redirect('/profile');
    });
  });
}); // end: sign-up routine


router.post('/signin', function(req, res) {

	const email = req.body.email;
  const password = req.body.password;
	const remember = req.body.remember;

  // looks for the account inputed in the database
	User.findOne({ where: { email: email } }).then(function(user) {
    if (user === null) {
      req.flash('signInMessage', 'Incorrect email.');
      return res.redirect('/');
    }
        
    // part of the bcrypt package, checks if the password is the same 
		const match = bcrypt.compareSync(password, user.password);
		if (!match) {
			req.flash('signInMessage', 'Incorrect password.');
			return res.redirect('/');
		}

    // shows that the account is signed in successfully 
    req.flash('statusMessage', 'Signed in successfully!');
    req.session.currentUser = user.email;

    // save user session to cookies
		if (remember) {
			req.session.cookie.maxAge = 1000 * 60 * 60;
		}
		res.redirect('/profile');
  });
}); // end: sign-in routine

router.get('/signout', function(req, res) {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;