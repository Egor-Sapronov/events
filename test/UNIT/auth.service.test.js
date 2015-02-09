var expect = require('chai').expect,
    db = require('../../libs/data/database'),
    userService = require('../../libs/auth/authService');

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
                    userService
                        .createToken(user)
                        .then(function (token) {
                            expect(token.token).to.be.a('string');
                            expect(token.UserId).to.equal(user.id);

                            db.AccessToken
                                .count({where: {UserId: user.id}})
                                .then(function (count) {
                                    expect(count).to.equal(1);
                                    done();
                                });
                        });
                });
        });

        describe('#register', function () {
            it('Should return access token for the new user', function (done) {
                db.sequelize.sync({force: true})
                    .then(function () {
                        userService
                            .register({
                                username: 'egor',
                                password: '123456',
                                email: 'sapronov.egor@gmail.com'
                            })
                            .then(function (token) {
                                expect(token.token).to.be.a('string');

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
                        userService.logOff(user)
                            .then(function () {
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
});