var app = require('./app'),
    sequelize = require('./libs/data/database');

sequelize
    .sync({force: true})
    .then(function () {
        app.listen(process.env.PORT || 3000, function () {
        });

    });
