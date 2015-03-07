'use strict';

var db = require('../data/database');
var authService = require('./authService');

/**
 * Exchange user for access token
 * @param {string} accessToken
 * @param {function}
 */
function bearerStrategy(accessToken, done) {
    db.AccessToken
        .find({where: {token: accessToken}})
        .then(function (token) {
            db.User
                .find({where: {id: token.UserId}})
                .then(function (user) {
                    done(null, user);
                });
        });
}

function faceBookStrategy(accessToken, refreshToken, profile, done) {
    db.User
        .findOrCreate({
            where: {providerId: profile.id},
            defaults: {
                providerId: profile.id,
                provider: profile.provider,
                profileLink: profile.profileUrl,
                displayName: profile.displayName,
                name: profile._json.name,
                email: profile._json.email,
                gender: profile.gender
            }
        })
        .spread(function (user, created) {
            authService
                .saveToken(user, accessToken)
                .then(function () {
                    return done(null, user);
                });

        });
}

module.exports = {
    bearerStrategy: bearerStrategy,
    faceBookStrategy: faceBookStrategy
};
