var roleService = require('../../libs/roles/roleService'),
    request = require('supertest'),
    app = require('../../app'),
    passport = require('../../libs/auth/auth').passport,
    db = require('../../libs/data/database'),
    authService = require('../../libs/auth/authService'),
    roleService = require('../../libs/roles/roleService');


describe('Role service', function () {
    describe('#roleHandler basic strategy', function () {
        app.get('/roletestbasic', passport.authenticate('basic', {session: false}), roleService.roleHandler('test'), function (req, res) {
            res.status(200).end();
        });

        it('Should return 200 status code if user is in role', function (done) {
            var role, user;
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.Role.create({
                        title: 'test'
                    });
                })
                .then(function (entity) {
                    role = entity;
                    return db.User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function (entity) {
                    user = entity;
                    return user.addRole(role);
                })
                .then(function () {
                    var encodedCredential = new Buffer('sapronov.egor@gmail.com:123456').toString('base64');
                    request(app)
                        .get('/roletestbasic')
                        .set('Authorization', 'Basic ' + encodedCredential)
                        .expect(200, done);
                });
        });

        it('Should return 401 status code if user is not in role', function (done) {
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.Role.create({
                        title: 'test'
                    });
                })
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
                        .get('/roletestbasic')
                        .set('Authorization', 'Basic ' + encodedCredential)
                        .expect(401, done);
                });
        });
    });

    describe('#roleHandler bearer strategy', function () {
        app.get('/roletestbearer', passport.authenticate('bearer', {session: false}), roleService.roleHandler('test'), function (req, res) {
            res.status(200).end();
        });

        it('Should return 200 status code if user is in role', function (done) {
            var role, user;
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.Role.create({
                        title: 'test'
                    });
                })
                .then(function (entity) {
                    role = entity;
                    return db.User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function (entity) {
                    user = entity;
                    return user.addRole(role);
                })
                .then(function () {
                    return authService.createToken(user);
                })
                .then(function (token) {
                    request(app)
                        .get('/roletestbearer')
                        .set('Authorization', 'Bearer ' + token.token)
                        .expect(200, done);
                });
        });

        it('Should return 401 status code if user is not in role', function (done) {
            var role, user;
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.Role.create({
                        title: 'test'
                    });
                })
                .then(function (entity) {
                    role = entity;
                    return db.User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function (entity) {
                    user = entity;
                    return authService.createToken(user);
                })
                .then(function (token) {
                    request(app)
                        .get('/roletestbearer')
                        .set('Authorization', 'Bearer ' + token.token)
                        .expect(401, done);
                });
        });
    });

    describe('#roleHandler without auth strategy', function () {
        app.get('/roletest', roleService.roleHandler('test'), function (req, res) {
            res.status(200).end();
        });
        it('Should return 500 status code', function (done) {
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function () {
                    request(app)
                        .get('/roletest')
                        .expect(500, done);
                });
        });
    });
});

