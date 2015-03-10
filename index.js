'use strict';

var app = require('./app');
var config = require('./libs/config');
var logger = require('morgan');
var db = require('./libs/data/database');

app.use(logger('dev'));

db.sequelize
    .sync({force: true})
    .then(function () {
        app.listen(config.get('port'), function () {

        });
    });
