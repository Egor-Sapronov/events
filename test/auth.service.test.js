var expect = require('chai').expect,
    User = require('../libs/data/database').User,
    sequelize = require('../libs/data/database').sequelize,
    AccessToken = require('../libs/data/database').AccessToken,
    createToken = require('../libs/auth/authServive').createToken;

describe('Auth service', function () {
    describe('#createToken', function () {
        it('Should generate remove all tokens for the user and generate one new', function (done) {
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
});