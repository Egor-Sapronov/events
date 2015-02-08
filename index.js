var app = require('./app'),
    db = require('./libs/data/database');

db.sequelize
    .sync({force: true})
    .then(function () {
        return db.User.create({
            username: 'egor',
            password: '123456',
            email: 'sapronov.egor@gmail.com'
        })
            .then(function () {
                app.listen(process.env.PORT || 3000, function () {
                });
            });
    });
