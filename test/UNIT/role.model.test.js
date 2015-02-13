var expect = require('chai').expect,
    db = require('../../libs/data/database');

describe('Role model', function () {
    it('User should has role', function (done) {
        var role, user;
        db.sequelize.sync({force: true})
            .then(function () {
                return db.Role.create({
                    title: 'test'
                });
            })
            .then(function (entity) {
                role = entity;
                return db.User.create({
                    username: 'egor',
                    password: '123456',
                    email: 'sapronov.egor@gmail.com'
                });
            })
            .then(function (entity) {
                user = entity;
                return user.addRole(role);
            })
            .then(function () {
                expect(user.hasRole(role)).to.be.ok;
                expect(role.hasUser(user)).to.be.ok;
                done();
            });
    });
});
