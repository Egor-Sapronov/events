var expect = require('chai').expect,
    User = require('../../libs/data/database').User,
    sequelize = require('../../libs/data/database').sequelize,
    AccessToken = require('../../libs/data/database').AccessToken,
    basicStrategy = require('../../libs/auth/strategy').basicStrategy,
    bearerStrategy = require('../../libs/auth/strategy').bearerStrategy;

describe('Auth strategy', function () {

    describe('#basicStrategy', function () {
        it('Should return user for username and password', function (done) {
            sequelize.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                }).then(function () {
                    basicStrategy('sapronov.egor@gmail.com', '123456', function (err, user) {
                        expect(user.username).to.equal('egor');
                        done();
                    });
                });
        });

        it('Should return error err user is not exist', function (done) {
            sequelize.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                }).then(function () {
                    basicStrategy('bad@email.com', '123456', function (err, user) {
                        expect(user).to.equal(undefined);
                        expect(err).to.be.ok;
                        done();
                    });
                });
        });

        it('Should return false if password is incorrect', function (done) {
            sequelize.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                }).then(function () {
                    basicStrategy('sapronov.egor@gmail.com', 'bad password', function (err, user) {
                        expect(user).to.equal(false);
                        done();
                    });
                });
        });

        it('Should return false if user is not exist', function (done) {
            sequelize.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                }).then(function () {
                    basicStrategy('Bad@user.com', 'bad password', function (err, user) {
                        expect(user).to.equal(false);
                        done();
                    });
                });
        });
    });
    describe('#bearerStrategy', function () {
        it('Should return user for token', function (done) {
            var user;
            sequelize.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function (userEntity) {
                    user = userEntity;
                    return AccessToken.create({
                        token: 'abc'
                    });
                })
                .then(function (token) {
                    return token.setUser(user);
                })
                .then(function () {
                    bearerStrategy('abc', function (err, userResult) {
                        expect(userResult.username).to.equal('egor');
                        done();
                    });
                });
        });

        it('Should return false if token is unknown', function (done) {
            var user;
            sequelize.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function (userEntity) {
                    user = userEntity;
                    return AccessToken.create({
                        token: 'abc'
                    });

                })
                .then(function (token) {
                    return token.setUser(user);
                })
                .then(function () {
                    bearerStrategy('badtoken', function (err, userResult) {
                        expect(userResult).to.equal(false);
                        done();
                    });
                });
        });

        it('Should return err if token is not a string', function (done) {
            var user;
            sequelize.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function (userEntity) {
                    user = userEntity;
                    return AccessToken.create({
                        token: 'abc'
                    });

                })
                .then(function (token) {
                    return token.setUser(user);
                })
                .then(function () {
                    bearerStrategy({}, function (err, userResult) {
                        expect(userResult).to.equal(undefined);
                        expect(err).to.be.ok;
                        done();
                    });
                });
        });
    });
});