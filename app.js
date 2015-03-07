'use strict';

var express = require('express'),
    passport = require('./libs/auth/auth').passport,
    app = express();

app.use(passport.initialize());

module.exports = app;
