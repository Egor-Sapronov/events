var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    basicStartegy = require('./strategy').basicStategy,
    clientPasswordStartegy = require('./strategy').clientPasswordStrategy,
    bearerStartegy = require('./strategy').bearerStategy;

passport.use(new BasicStrategy(basicStartegy));
passport.use(new ClientPasswordStrategy(clientPasswordStartegy));
passport.use(new BearerStrategy(bearerStartegy));