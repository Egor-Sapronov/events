var app = require('./app'),
    Client = require('./libs/model/client'),
    User = require('./libs/model/user'),
    AccessToken = require('./libs/model/accessToken'),
    sequelize = require('./libs/data/database');

sequelize
    .sync({force: true})
    .then(function () {

        User.create({
            username: 'egor',
            password: '123456'
        });

        Client.create({
            name: 'web',
            secret: '123456'
        });

        app.listen(process.env.PORT || 3000, function () {
            "use strict";

            console.log('listen');
        });
    });
