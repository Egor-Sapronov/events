'use strict';

var passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    strategy = require('./strategy'),
    FacebookStrategy = require('passport-facebook');


passport.use(new BearerStrategy(strategy.bearerStrategy));
passport.use(new FacebookStrategy({
    clientID: 'CLIENT_ID',
    clientSecret: 'CLIENT_SECRET',
    callbackURL: "CALLBACK_URL"
}, strategy.facebookStrategy));

module.exports.passport = passport;