var expect = require('chai').expect,
    sequelize = require('../libs/data/database'),
    User = require('../libs/model/user');


describe('User model', function () {
    describe('#checkPassword of the User instance', function () {
        it('Should return true on correct password and false on incorrect', function (done) {
            sequelize.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456'
                    });
                }).then(function (user) {
                    expect(user.checkPassword('123456')).to.be.true;
                    done();
                });
        });
    });
});