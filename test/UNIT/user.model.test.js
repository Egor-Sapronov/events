var expect = require('chai').expect,
    User = require('../../libs/data/database').User,
    sequelize = require('../../libs/data/database').sequelize;


describe('User model', function () {
    describe('#checkPassword of the User instance', function () {
        it('Should return true on correct password and false on incorrect', function (done) {
            sequelize.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456',
                        email:'sapronov.egor@gmail.com'
                    });
                }).then(function (user) {
                    expect(user.checkPassword('123456')).to.be.true;
                    done();
                });
        });
    });
});