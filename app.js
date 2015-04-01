'use strict';

let express = require('express');
let passport = require('./libs/auth/auth.es6').passport;
let app = express();
let router = require('./routes/main.es6');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let methodOverride = require('method-override');
let bodyParser = require('body-parser');

app.use('/static', express.static('./web/dist'));
app.set('view engine', 'jade');
app.set('views', './web/src/templates');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    cookie: true,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);


module.exports = app;
