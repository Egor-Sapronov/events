'use strict';

let passport = require('passport');
let BearerStrategy = require('passport-http-bearer').Strategy;
let strategy = require('./strategy.es6');
let FacebookStrategy = require('passport-facebook');
let db = require('../data/database.es6');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    db.User.find({
        where: {
            id: id
        }
    })
        .then(function (user) {
            done(null, user);
        });
});

passport.use(new BearerStrategy(strategy.bearerStrategy));
passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback'
}, strategy.facebookStrategy));

module.exports.passport = passport;