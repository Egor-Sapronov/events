var app = require('./app'),
    User = require('./libs/data/database').User,
    sequelize = require('./libs/data/database').sequelize;

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
