'use strict';

var express = require('express'),
    passport = require('./libs/auth/auth').passport,
    authRouter = require('./routes/auth'),
    app = express();

app.use(passport.initialize());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('/auth', authRouter);

module.exports = app;
