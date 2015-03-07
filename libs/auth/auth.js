'use strict';

var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var strategy = require('./strategy');
var FacebookStrategy = require('passport-facebook');
var config = require('../config');


passport.use(new BearerStrategy(strategy.bearerStrategy));
passport.use(new FacebookStrategy({
    clientID: config.get('facebook:clientID'),
    clientSecret: config.get('facebook:clientSecret'),
    callbackURL: config.get('facebook:callbackURL')
}, strategy.facebookStrategy));

module.exports.passport = passport;