'use strict';

var crypto = require('crypto'),
    UserModel = require('../model/user'),
    AccessTokenModel = require('../model/accessToken');

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

                    var info = {scope: '*'};

                    done(null, user, info);
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

//function exchangeStrategy(client, username, password, scope, done) {
//    var user;
//
//    UserModel
//        .find({where: {username: username}})
//        .then(function (userEntity) {
//            if (!userEntity) {
//                return done(null, false);
//            }
//            if (!userEntity.checkPassword(password)) {
//                return done(null, false);
//            }
//
//            console.log(user);
//            user = userEntity;
//
//            return AccessTokenModel
//                .destroy({
//                    where: {
//                        UserId: userEntity.id,
//                        ClientId: client.id
//                    }
//                })
//                .then(function () {
//                    var tokenValue = crypto.randomBytes(32).toString('base64');
//
//                    return AccessTokenModel.create({
//                        token: tokenValue,
//                        ClientId: client.id,
//                        UserId: user.id
//                    });
//                })
//                .then(function (token) {
//                    done(null, token.token);
//                });
//        })
//        .catch(function (err) {
//            if (err) {
//                return done(err);
//            }
//        });
//
//}

module.exports.basicStrategy = basicStrategy;
module.exports.bearerStrategy = bearerStrategy;
