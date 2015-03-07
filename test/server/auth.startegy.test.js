var expect = require('chai').expect;

describe('Auth strategy, facebook and bearer', function () {
    var strategy = require('../../libs/auth/strategy');
    var db = require('../../libs/data/database');
    it('Should exist', function () {
        expect(strategy).to.be.ok;
    });

    describe('#facebookStrategy', function () {
        it('Should save user and access token in db', function (done) {
            db.sequelize.sync({force: true})
                .then(function () {
                    var profile = {
                        id: '1',
                        provider: 'facebook',
                        profileUrl: 'https://link.com',
                        displayName: 'egor sapronov',
                        gender: 'male',
                        _json: {
                            name: 'egor',
                            email: 'sapronov egor'
                        }
                    };
                    var accessToken = 'token';
                    var refreshToken = 'refreshtoken';

                    strategy.faceBookStrategy(accessToken, refreshToken, profile, function (err, user) {
                        expect(user).to.be.ok;
                        expect(user.providerId).to.equal(profile.id);
                        done();
                    });
                });
        });
    });

    describe('#bearerStrategy', function () {
        it('Should return user by related access token', function (done) {
            var user;
            var token;
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User
                        .create({
                            providerId: '1',
                            profileLink: 'https://link.com'
                        });
                })
                .then(function (entity) {
                    user = entity;
                    return db.AccessToken.create({
                        token: 'token',
                        UserId: user.id
                    });
                })
                .then(function (entity) {
                    token = entity;

                    strategy.bearerStrategy(token.token, function (err, user) {
                        expect(user).to.be.ok;
                        expect(user.providerId).to.be.ok;
                        done();
                    });
                });
        });
    });
});