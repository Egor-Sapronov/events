var expect = require('chai').expect,
    User = require('../libs/model/user');
describe('User model', function () {


    it('Should exist', function () {
        expect(User).to.exist;
    });

    describe('User creation', function () {
        it('Should creates', function (done) {
            User.sync({force: true})
                .then(function () {
                    return User.create({
                        username: 'egor',
                        password: '123456'
                    });
                }).then(function () {
                    done();
                });
        });
    });
});