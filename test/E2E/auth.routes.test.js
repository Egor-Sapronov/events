var request = require('supertest'),
    app = require('../../app'),
    db = require('../../libs/data/database');

describe('Auth endpoints', function () {
    describe('#/auth/login', function () {
        it('Should exchange token for email and password', function (done) {
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

                    function hasToken(res) {
                        if (!('token' in res.body))
                            return 'missing access token';
                    }

                    function hasUsername(res) {
                        if (!('username' in res.body))
                            return 'missing username';
                    }

                    request(app)
                        .get('/auth/login')
                        .set('Authorization', 'Basic ' + encodedCredential)
                        .expect(hasToken)
                        .expect(hasUsername)
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
                    var encodedCredential = new Buffer('sapronov.egor@gmail.com:badpassword').toString('base64');
                    request(app)
                        .get('/auth/login')
                        .set('Authorization', 'Basic ' + encodedCredential)
                        .expect(401, done);
                });
        });
    });
    describe('#/auth/logoff', function () {
        it('Should log off user', function (done) {
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
                        .get('/auth/login')
                        .set('Authorization', 'Basic ' + encodedCredential)
                        .expect(200)
                        .end(function (err, res) {
                            request(app)
                                .get('/auth/logoff')
                                .set('Authorization', 'Bearer ' + res.body.token)
                                .expect(200, done);
                        });
                });
        });

        it('Should return 401 status code if token is bad', function (done) {
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
                        .get('/auth/login')
                        .set('Authorization', 'Basic ' + encodedCredential)
                        .expect(200)
                        .end(function (err, res) {
                            request(app)
                                .get('/auth/logoff')
                                .set('Authorization', 'Bearer ' + 'badtoken')
                                .expect(401, done);
                        });
                });
        });
    });
});