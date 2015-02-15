'use strict';

var app = require('./app'),
    logger = require('morgan'),
    db = require('./libs/data/database');

app.use(logger('dev'));

db.sequelize
    .sync({force: true})
    .then(function () {
        app.listen(process.env.PORT || 3000, function () {
        });
    });
