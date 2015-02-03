'use strict';

var crypto = require('crypto'),
    db = require('../data/database'),
    service;

/**
 * generate access token for user
 * @param user
 * @param callback <err,token>
 */
function createToken(user, callback) {
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

/**
 * creates new user and generate access token for him
 * @param options user data {username, email, password}
 * @param callback <err, user, token>
 */
function register(options, callback) {
    db.User
        .create(options)
        .then(function (user) {
            createToken(user, function (err, token) {
                if (err) {
                    callback(err, false, false);
                }

                callback(null, user, token);
            });
        })
        .catch(function (err) {
            callback(err, false, false);
        });
}

// TODO: error handling
/**
 * delete all access tokens for the user
 * @param user
 * @param callback <>
 */
function logOff(user, callback) {
    db.AccessToken
        .destroy({where: {UserId: user.id}})
        .then(function () {
            callback();
        });
}

service = {
    createToken: createToken,
    register: register,
    logOff: logOff
};

module.exports = service;
