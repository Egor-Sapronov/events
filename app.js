'use strict';

let express = require('express');
let passport = require('./libs/auth/auth.es6').passport;
let app = express();
let logger = require('morgan');
let router = require('./routes/main.es6');

app.use(logger('dev'));
app.use('/static', express.static('./web/dist'));
app.set('view engine', 'jade');
app.set('views', './web/src/templates');
app.use(passport.initialize());
app.use('/', router);


module.exports = app;
