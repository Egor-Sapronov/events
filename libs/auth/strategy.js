'use strict';

var UserModel = require('../model/user'),
    AccessTokenModel = require('../model/accessToken');

/**
 * Exchange user for username and password
 * @param {string} username
 * @param {string} password
 * @param {function} <err,user>
 */
function basicStrategy(username, password, done) {
    UserModel
        .find({where: {username: username}})
        .then(function (user) {

            if (!user) {
                return done(null, false);
            }

            if (!user.checkPassword(password)) {
                return done(null, false);
            }

            return done(null, user);
        })
        .catch(function (err) {
            if (err) {
                return done(err);
            }
        });
}

/**
 * Exchange user for access token
 * @param {string} accessToken
 * @param {function} <err,user>
 */
function bearerStrategy(accessToken, done) {
    AccessTokenModel
        .find({where: {token: accessToken}})
        .then(function (token) {
            if (!token) {
                return done(null, false);
            }

            UserModel
                .find({where: {id: token.UserId}})
                .then(function (user) {
                    if (!user) {
                        return done(null, false, {message: 'Unknown user'});
                    }

                    done(null, user);
                })
                .catch(function (err) {
                    if (err) {
                        return done(err);
                    }
                });
        })
        .catch(function (err) {
            if (err) {
                return done(err);
            }
        });
}

module.exports.basicStrategy = basicStrategy;
module.exports.bearerStrategy = bearerStrategy;
