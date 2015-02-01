var expect = require('chai').expect,
    User = require('../libs/model/user'),
    AccessToken = require('../libs/model/accessToken'),
    basicStrategy = require('../libs/auth/strategy').basicStrategy,
    bearerStrategy = require('../libs/auth/strategy').bearerStrategy;

describe('Auth strategy', function () {

    describe('#basicStrategy', function () {
        it('Should return user for username and password', function(done){
            User.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456'
                    });
                }).then(function () {
                    basicStrategy('egor', '123456', function (err,user) {
                        expect(user.username).to.equal('egor');
                        done();
                    });
                });
        });

        it('Should return false if password is incorrect', function(done){
            User.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456'
                    });
                }).then(function () {
                    basicStrategy('egor', 'bad password', function (err,user) {
                        expect(user).to.equal(false);
                        done();
                    });
                });
        });

        it('Should return false if user is not exist', function(done){
            User.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456'
                    });
                }).then(function () {
                    basicStrategy('Bad user', 'bad password', function (err,user) {
                        expect(user).to.equal(false);
                        done();
                    });
                });
        });
    });
    describe('#bearerStrategy', function () {

    });
});