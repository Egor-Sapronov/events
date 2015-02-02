'use strict';

var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    basicStrategy = require('./strategy').basicStrategy,
    bearerStrategy = require('./strategy').bearerStrategy,
    crypto = require('crypto'),
    db = require('../data/database');

passport.use(new BasicStrategy(basicStrategy));
passport.use(new BearerStrategy(bearerStrategy));

/**
 * generate access token for user
 * @param user
 * @param callback <err,token>
 */
function tokenService(user, callback) {
    db.AccessToken
        .destroy({where: {UserId: user.id}})
        .then(function () {
            return db.AccessToken
                .create({
                    token: crypto.randomBytes(32).toString('base64'),
                    UserId: user.id
                })
                .then(function (token) {
                    callback(null, token);
                })
                .catch(function (err) {
                    callback(err, false);
                });
        })
        .catch(function (err) {
            callback(err, false);
        });
}

module.exports.tokenService = tokenService;