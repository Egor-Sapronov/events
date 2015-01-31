'use strict';


var UserModel = require('../model/user'),
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

module.exports.basicStategy = basicStategy;
module.exports.bearerStategy = bearerStategy;
