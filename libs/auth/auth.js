'use strict';

let passport = require('passport');
let BearerStrategy = require('passport-http-bearer').Strategy;
let strategy = require('./strategy');
let FacebookStrategy = require('passport-facebook');
let config = require('../config');

passport.use(new BearerStrategy(strategy.bearerStrategy));
passport.use(new FacebookStrategy({
    clientID: config.get('facebook:clientID'),
    clientSecret: config.get('facebook:clientSecret'),
    callbackURL: config.get('facebook:callbackURL')
}, strategy.facebookStrategy));

module.exports.passport = passport;