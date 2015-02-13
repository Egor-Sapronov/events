'use strict';

var express = require('express'),
    passport = require('./libs/auth/auth').passport,
    authRouter = require('./routes/auth'),
    app = express();

app.use(passport.initialize());

app.use('/auth', authRouter);

module.exports = app;
