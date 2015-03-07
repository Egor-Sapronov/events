var expect = require('chai').expect;

describe('Auth strategy, facebook and bearer', function () {
    var strategy = require('../../libs/auth/strategy');

    it('Should exist', function () {
        expect(strategy).to.be.ok;
    });

    describe('#facebookStrategy', function () {
        it('Should save user and access token in db', function (done) {
            var db = require('../../libs/data/database');
            db.sequelize.sync({force: true})
                .then(function () {
                    var profile = {
                        id: '2',
                        provider: 'facebook',
                        profileUrl: 'https://link2.com',
                        displayName: 'egor sapronov',
                        gender: 'male',
                        _json: {
                            name: 'egor',
                            email: 'sapronov egor'
                        }
                    };
                    var accessToken = 'token';
                    var refreshToken = 'refreshtoken';

                    strategy.facebookStrategy(accessToken, refreshToken, profile, function (err, user) {
                        expect(user).to.be.ok;
                        expect(user.providerId).to.equal(profile.id);
                        done();
                    });
                });
        });
    });

    describe('#bearerStrategy', function () {
        it('Should return user by related access token', function (done) {
            var db = require('../../libs/data/database');
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