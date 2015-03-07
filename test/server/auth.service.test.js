var expect = require('chai').expect;

describe('Auth service', function () {
    var service = require('../../libs/auth/authService');
    var db = require('../../libs/data/database');

    it('Should exist', function () {
        expect(service).to.be.ok;
    });

    describe('#saveToken', function () {
        it('Should save token for the user', function (done) {
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User
                        .create({
                            providerId: '1',
                            profileLink: 'https://link.com'
                        });
                })
                .then(function (user) {
                    return service.saveToken(user, 'token');
                })
                .then(function (token) {
                    expect(token).to.be.ok;
                    done();
                });
        });
    });
});