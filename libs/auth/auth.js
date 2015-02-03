'use strict';

var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    basicStrategy = require('./strategy').basicStrategy,
    bearerStrategy = require('./strategy').bearerStrategy;

passport.use(new BasicStrategy(basicStrategy));
passport.use(new BearerStrategy(bearerStrategy));
