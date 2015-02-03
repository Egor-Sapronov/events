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

service = {
    createToken: createToken
};

module.exports = service;
