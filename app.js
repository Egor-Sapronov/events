'use strict';

let express = require('express');
let passport = require('./libs/auth/auth.es6').passport;
let app = express();
let config = require('./libs/config.es6');
let logger = require('morgan');
let router = require('./routes/main.es6');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let methodOverride = require('method-override');
let bodyParser = require('body-parser');

app.use(logger('dev'));
app.use('/static', express.static('./web/dist'));
app.set('view engine', 'jade');
app.set('views', './web/src/templates');
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({secret: 'test_secret', cookie: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);


module.exports = app;
