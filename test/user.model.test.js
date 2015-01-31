var expect = require('chai').expect,
    User = require('../libs/model/user').User,
    checkPassword = require('../libs/model/user').checkPassword;
describe('User model', function () {


    it('Should exist', function () {
        expect(User).to.exist;
    });

    describe('#create', function () {
        it('Should create user', function (done) {
            User.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456'
                    });
                }).then(function (user) {
                    expect(user.username).to.equal('egor');
                    expect(checkPassword('123456', user.hashedPassword, user.salt)).to.be.true;
                    done();
                });
        });
    });
});