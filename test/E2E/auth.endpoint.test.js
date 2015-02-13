var request = require('supertest'),
    app = require('../../app'),
    passport = require('../../libs/auth/auth').passport,
    authService = require('../../libs/auth/authService'),
    db = require('../../libs/data/database');

describe('Auth strategy handlers', function () {
    describe('#basic', function () {
        app.get('/basic', passport.authenticate('basic', {session: false}), function (req, res) {
            res.status(200).end();
        });
        it('Should provide access by email and password and return 200 status code', function (done) {
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function () {
                    var encodedCredential = new Buffer('sapronov.egor@gmail.com:123456').toString('base64');
                    request(app)
                        .get('/basic')
                        .set('Authorization', 'Basic ' + encodedCredential)
                        .expect(200, done);
                });
        });

        it('Should return 401 status code if credentials is incorrect', function (done) {
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function () {
                    var encodedCredential = new Buffer('sapronov.egor@gmail.com:bad passowrd').toString('base64');
                    request(app)
                        .get('/basic')
                        .set('Authorization', 'Basic ' + encodedCredential)
                        .expect(401, done);
                });
        });
    });

    describe('#bearer', function () {
        app.get('/bearer', passport.authenticate('bearer', {session: false}), function (req, res) {
            res.status(200).end();
        });

        it('Should provide access by access token and return 200 status code', function (done) {
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function (user) {
                    return authService.createToken(user);
                })
                .then(function (token) {
                    request(app)
                        .get('/bearer')
                        .set('Authorization', 'Bearer ' + token.token)
                        .expect(200, done);
                });
        });

        it('Should return 401 if access token is incorrect', function (done) {
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function (user) {
                    return authService.createToken(user);
                })
                .then(function (token) {
                    request(app)
                        .get('/bearer')
                        .set('Authorization', 'Bearer badtoken')
                        .expect(401, done);
                });
        });
    });
});

