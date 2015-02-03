var expect = require('chai').expect,
    db = require('../libs/data/database'),
    userService = require('../libs/auth/authService');

describe('Auth service', function () {
    describe('#createToken', function () {
        it('Should remove all tokens for the user and generate one new', function (done) {
            var user;
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function (userEntity) {
                    user = userEntity;
                    return db.AccessToken.create({
                        token: 'abc'
                    });
                })
                .then(function (token) {
                    return token.setUser(user);
                })
                .then(function () {
                    userService.createToken(user, function (err, tokenResult) {
                        expect(tokenResult.token).to.be.a('string');
                        expect(tokenResult.UserId).to.equal(user.id);

                        // Check that user has only one token
                        db.AccessToken.count({where: {UserId: user.id}})
                            .then(function (count) {
                                expect(count).to.equal(1);
                                done();
                            });
                    });
                });
        });
    });

    describe('#register', function () {
        it('Should return new user and access token', function (done) {
            db.sequelize.sync({force: true})
                .then(function () {
                    userService.register({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    }, function (err, user, token) {
                        expect(err).to.equal(null);
                        expect(user.id).to.equal(token.UserId);
                        expect(user.username).to.equal('egor');

                        done();
                    });
                });
        });
    });

    describe('#logOff', function () {
        it('Should destroy all tokens of the user', function (done) {
            var user;
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function (userEntity) {
                    user = userEntity;
                    return db.AccessToken.create({
                        token: 'abc'
                    });
                })
                .then(function (token) {
                    return token.setUser(user);
                })
                .then(function () {
                    userService.logOff(user, function () {

                        db.AccessToken.count({where: {UserId: user.id}})
                            .then(function (count) {
                                expect(count).to.equal(0);
                                done();
                            });
                    });
                });
        });
    });
});