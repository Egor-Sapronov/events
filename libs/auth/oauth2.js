'use strict';

var oauth2orize = require('oauth2orize'),
    passport = require('passport'),
    exchangeStrategy = require('./strategy').exchangeStrategy,
    server = oauth2orize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(exchangeStrategy));

// token endpoint
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
    server.token(),
    server.errorHandler()
];