'use strict';

let express = require('express');
let passport = require('./libs/auth/auth').passport;
let app = express();

app.use(passport.initialize());

module.exports = app;
