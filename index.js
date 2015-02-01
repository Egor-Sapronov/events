var app = require('./app'),
    User = require('./libs/model/user'),
    AccessToken = require('./libs/model/accessToken'),
    sequelize = require('./libs/data/database');

sequelize
    .sync({force: true})
    .then(function () {
        return User.create({
            username: 'egor',
            password: '123456'
        })
            .then(function () {
                app.listen(process.env.PORT || 3000, function () {
                });
            });
    });
