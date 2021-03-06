'use strict';

let db = require('../data/database.es6');
let authService = require('./authService.es6');

/**
 * Exchange user for access token
 * @param {string} accessToken
 * @param {function}
 */
function bearerStrategy(accessToken, done) {
    db.AccessToken
        .find({where: {token: accessToken}})
        .then(function (token) {
            if (token === null) {
                return done(null, false);
            }
            db.User
                .find({where: {id: token.UserId}})
                .then(function (user) {
                    done(null, user);
                });
        });
}

function facebookStrategy(accessToken, refreshToken, profile, done) {
    // TODO: use findOrCreate when bug with postrgesql will be fixed
    db.User
        .find({where: {providerId: profile.id}})
        .then(function (user) {
            if (!user) {
                db.User
                    .create({
                        providerId: profile.id,
                        provider: profile.provider,
                        profileLink: profile.profileUrl,
                        displayName: profile.displayName,
                        name: profile._json.name,
                        email: profile._json.email,
                        gender: profile.gender
                    })
                    .then(function (user) {
                        authService
                            .saveToken(user, accessToken)
                            .then(function () {
                                return done(null, user);
                            });
                    });
            } else {
                authService
                    .saveToken(user, accessToken)
                    .then(function () {
                        return done(null, user);
                    });
            }
        });

}

module.exports = {
    bearerStrategy: bearerStrategy,
    facebookStrategy: facebookStrategy
};
