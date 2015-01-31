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

}


function clientPasswordStrategy(clientId, clientSecret, done) {

}

module.exports.basicStategy = basicStategy;
module.exports.bearerStategy = bearerStategy;
module.exports.clientPasswordStrategy = clientPasswordStrategy;
