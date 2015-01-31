'use strict';

var crypto = require('crypto'),
    UserModel = require('../model/user'),
    ClientModel = require('../model/client'),
    AccessTokenModel = require('../model/accessToken');

function basicStategy(clientName, clientSecret, done) {
    ClientModel
        .find({where: {name: clientName}})
        .then(function (client) {

            if (!client) {
                return done(null, false);
            }

            if (client.secret != clientSecret) {
                return done(null, false);
            }

            return done(null, client);
        })
        .catch(function (err) {
            if (err) {
                return done(err);
            }
        });
}

function bearerStategy(accessToken, done) {
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

                    var info = {scope: '*'};

                    done(null, user, info);
                });
        })
        .catch(function (err) {
            if (err) {
                return done(err);
            }
        });
}

function exchangeStrategy(client, username, password, scope, done) {
    var user;

    UserModel
        .find({where: {username: username}})
        .then(function (userEntity) {
            if (!userEntity) {
                return done(null, false);
            }
            if (!userEntity.checkPassword(password)) {
                return done(null, false);
            }

            user = userEntity;

            return AccessTokenModel
                .destroy({
                    where: {
                        UserId: userEntity.id,
                        ClientId: client.id
                    }
                })
                .then(function () {
                    var tokenValue = crypto.randomBytes(32).toString('base64');

                    return AccessTokenModel.create({
                        token: tokenValue,
                        ClientId: client.id,
                        UserId: user.id
                    });
                })
                .then(function (token) {
                    done(null, token.token);
                });
        })
        .catch(function (err) {
            if (err) {
                return done(err);
            }
        });

}

module.exports.exchangeStrategy = exchangeStrategy;
module.exports.basicStategy = basicStategy;
module.exports.bearerStategy = bearerStategy;
