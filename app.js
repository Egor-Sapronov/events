'use strict';

var express = require('express'),
    auth = require('./libs/auth/auth'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

module.exports = app;
