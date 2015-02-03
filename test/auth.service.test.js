var expect = require('chai').expect,
    User = require('../libs/data/database').User,
    sequelize = require('../libs/data/database').sequelize,
    AccessToken = require('../libs/data/database').AccessToken,
    createToken = require('../libs/auth/authService').createToken,
    register = require('../libs/auth/authService').register;

describe('Auth service', function () {
    describe('#createToken', function () {
        it('Should remove all tokens for the user and generate one new', function (done) {
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
                    createToken(user, function (err, tokenResult) {
                        expect(tokenResult.token).to.be.a('string');
                        expect(tokenResult.UserId).to.equal(user.id);

                        // Check that user has only one token
                        AccessToken.count({where: {UserId: user.id}})
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
            sequelize.sync({force: true})
                .then(function () {
                    register({
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
});