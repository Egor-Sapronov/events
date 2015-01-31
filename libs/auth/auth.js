var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    basicStartegy = require('./strategy').basicStategy,
    bearerStartegy = require('./strategy').bearerStategy;

passport.use(new BasicStrategy(basicStartegy));
passport.use(new ClientPasswordStrategy(basicStartegy));
passport.use(new BearerStrategy(bearerStartegy));