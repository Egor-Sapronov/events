'use strict';

var passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    bearerStrategy = require('./strategy').bearerStrategy;


passport.use(new BearerStrategy(bearerStrategy));

module.exports.passport = passport;