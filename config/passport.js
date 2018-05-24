const passport = require('passport');
const TwitterPassport = require('passport-twitter');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../models').User;
const database = require('../database');

passport.use(new TwitterPassport({
  consumerKey: '7mNd39P1eKcfpBF42skNxU6gV',
  consumerSecret: 'ng5453RTqS1ltO7AWyowl53RYk6KMqqRK72gpOq5Plm7QRmME0',
  callbackURL: 'http://localhost:3000/auth/twitter/callback'
}, function(token, secret, profile, cb) {
  User.findOrCreate({
    where: { email: profile.username, name: profile.displayName },
    defaults: { password: '' }
  }).then(function(result) {
    cb(null, result[0]);
  });
}));

passport.use(new GoogleStrategy({
    clientID:     '479301319318-t50h34dbtdob3996822mn9o76s7v275b.apps.googleusercontent.com',
    clientSecret: 'AIHxw0PaCBvzwkgXyIuteAwC',
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log("email: " + profile.emails + " name: " + profile.name);
    process.nextTick(function () {
      User.findOrCreate({ 
        where: { email: profile.id, name: profile.displayName },
        defaults: { password: '' }
      }).then(function(result) {
        return done(null, result[0]);
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ where: { id: id } }).then(function(user) {
    done(null, user);
  });
});

module.exports = passport;
