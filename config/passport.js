const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// Load User model
const User = require('../models/user.js');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, async(req, a, b, done) => {
          const { email, password } = req.body
          const user = await User.findOne({ email: email })
          if (user) {
            if (user.password == password) {
              return done(null, user)
            } else {
              return done(null, false)
            }
          } else {
            return done(null, false)
          }

        })
    );

    passport.serializeUser(function(user, done) {
        console.log('ser', user)
        return done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
      console.log(id)
      User.findById(id, (err, user) => {
        if (user) {
          console.log('deser', user)
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
    })
}
