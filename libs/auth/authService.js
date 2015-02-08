'use strict';

var crypto = require('crypto'),
    db = require('../data/database');

/**
 * generate access token for user
 * @param user
 * @return promise <AccessToken>
 */
function createToken(user) {
    return db.AccessToken
        .destroy({where: {UserId: user.id}})
        .then(function () {
            return db.AccessToken
                .create({
                    token: crypto.randomBytes(32).toString('base64'),
                    UserId: user.id
                });
        });
}

/**
 * creates new user and generate access token for him
 * @param options user data {username, email, password}
 * @return promise <AccessToken>
 */
function register(options) {
    return db.User
        .create(options)
        .then(function (user) {
            return createToken(user);
        });
}

// TODO: error handling
/**
 * delete all access tokens for the user
 * @param user
 * @return promise
 */
function logOff(user) {
    return db.AccessToken
        .destroy({where: {UserId: user.id}});
}

module.exports = {
    createToken: createToken,
    register: register,
    logOff: logOff
};
