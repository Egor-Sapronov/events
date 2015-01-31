var expect = require('chai').expect,
    Client = require('../libs/model/client'),
    User = require('../libs/model/user'),
    AccessToken = require('../libs/model/accessToken'),
    sequelize = require('../libs/data/database'),
    exchangeStrategy = require('../libs/auth/strategy').exchangeStrategy,
    basicStrategy = require('../libs/auth/strategy').basicStategy,
    bearerStrategy = require('../libs/auth/strategy').bearerStategy;

describe('Auth strategy', function () {
    describe('#basicStrategy', function () {
        it('Should return client if exist and password correct', function (done) {
            Client.sync({force: true})
                .then(function () {
                    return Client.create({
                        name: 'web',
                        secret: '123456'
                    });
                })
                .then(function () {
                    basicStrategy('web', '123456', function (err, client) {
                        expect(err).to.equal(null);
                        expect(client.name).to.equal('web');
                        done();
                    });
                });
        });

        it('Should return null if not exist', function (done) {
            Client.sync({force: true})
                .then(function () {
                    return Client.create({
                        name: 'web',
                        secret: '123456'
                    });
                })
                .then(function () {
                    basicStrategy('web2', '123456', function (err, client) {
                        expect(err).to.equal(null);
                        expect(client).to.equal(false);
                        done();
                    });
                });
        });
    });

    describe('#bearerStrategy', function () {
        it('Should return user by token value', function (done) {
            var user, client;

            sequelize.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456'
                    });
                })
                .then(function (userEntity) {
                    user = userEntity;
                    return Client.create({
                        name: 'web',
                        secret: '123456'
                    });
                })
                .then(function (clientEntity) {
                    client = clientEntity;
                    return AccessToken.create({
                        token: 'abc'
                    });
                })
                .then(function (token) {
                    return token.setUser(user);
                })
                .then(function (token) {
                    return token.setClient(client);
                })
                .then(function (token) {
                    return bearerStrategy(token.token, function (err, user) {
                        expect(err).to.equal(null);
                        expect(user.username).to.equal('egor');
                        done();
                    });
                });
        });

        it('Should return false by bad token value', function (done) {
            var user, client;

            sequelize.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456'
                    });
                })
                .then(function (userEntity) {
                    user = userEntity;
                    return Client.create({
                        name: 'web',
                        secret: '123456'
                    });
                })
                .then(function (clientEntity) {
                    client = clientEntity;
                    return AccessToken.create({
                        token: 'abc'
                    });
                })
                .then(function (token) {
                    return token.setUser(user);
                })
                .then(function (token) {
                    return token.setClient(client);
                })
                .then(function (token) {
                    return bearerStrategy('bad token', function (err, user) {
                        expect(err).to.equal(null);
                        expect(user).to.equal(false);
                        done();
                    });
                });
        });
    });

    describe('#exchangeStrategy', function () {
        it('Should exchange token for username and password', function (done) {
            var user, client;
            sequelize.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456'
                    });
                })
                .then(function (userEntity) {
                    user = userEntity;
                    return Client.create({
                        name: 'web',
                        secret: '123456'
                    });
                })
                .then(function (clientEntity) {
                    client = clientEntity;

                    exchangeStrategy(client, 'egor', '123456', {}, function (err, token) {
                        expect(err).to.equal(null);
                        expect(token).to.be.a('string');
                        done();
                    })
                });
        });
        it('Should return false if password is incorrect or user is not exist', function (done) {
            var user;
            sequelize.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456'
                    });
                })
                .then(function (userEntity) {
                    user = userEntity;
                    return Client.create({
                        name: 'web',
                        secret: '123456'
                    });
                })
                .then(function (clientEntity) {
                    exchangeStrategy(clientEntity, 'bad user', 'bad password', {}, function (err, token) {
                        expect(err).to.equal(null);
                        expect(token).to.equal(false);
                        done();
                    })
                });
        });
    });
});