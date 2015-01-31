var expect = require('chai').expect,
    User = require('../libs/model/user');


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
                    done();
                });
        });

        describe('#checkPassword of the User instance', function () {
            it('Should return true on correct password and false on incorrect', function (done) {
                User.sync({force: true})
                    .then(function () {
                        return User.create({
                            username: 'egor',
                            password: '123456'
                        });
                    }).then(function (user) {
                        expect(user.checkPassword('123456')).to.be.true;

                        expect(user.checkPassword('1234ssd56')).to.be.false;
                        done();
                    });
            });
        });
    });
});