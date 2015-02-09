'use strict';

var express = require('express'),
    auth = require('./libs/auth/auth'),
    logger = require('morgan'),
    passport = require('passport'),
    app = express();

app.use(logger('dev'));
app.use(passport.initialize());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

module.exports = app;
