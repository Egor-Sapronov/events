'use strict';

var express = require('express'),
    auth = require('./libs/auth/auth'),
    passport = require('passport'),
    authRouter = require('./routes/auth'),
    app = express();

app.use(passport.initialize());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('/auth', authRouter);

module.exports = app;
