'use strict';

var express = require('express');
var passport = require('./libs/auth/auth').passport;
var app = express();

app.use(passport.initialize());

module.exports = app;
