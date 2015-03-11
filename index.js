'use strict';

let app = require('./app');
let config = require('./libs/config.es6');
let db = require('./libs/data/database.es6');

db.sequelize
    .sync({force: true})
    .then(function () {
        app.listen(process.env.PORT || config.get('port'), function () {
            console.log('Express server listening on port ' + config.get('port'));
        });
    });
