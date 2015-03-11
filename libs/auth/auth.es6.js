'use strict';

let passport = require('passport');
let BearerStrategy = require('passport-http-bearer').Strategy;
let strategy = require('./strategy.es6');
let FacebookStrategy = require('passport-facebook');
let config = require('../config.es6');

passport.use(new BearerStrategy(strategy.bearerStrategy));
passport.use(new FacebookStrategy({
    clientID: config.get('facebook:clientID'),
    clientSecret: config.get('facebook:clientSecret'),
    callbackURL: '/auth/facebook/callback'
}, strategy.facebookStrategy));

module.exports.passport = passport;