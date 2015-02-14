var expect = require('chai').expect,
    db = require('../../libs/data/database'),
    roleService = require('../../libs/roles/roleService');


describe('Role service', function () {
    describe('#inRole', function () {
        it('Should return true if user is in role', function (done) {
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
                    return roleService.inRole(role.title, user);

                })
                .then(function (inRole) {
                    expect(inRole).to.be.ok;
                    done();
                });
        });

        it('Should return false if user is not in role', function (done) {
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
                    return roleService.inRole('badrole', user);
                })
                .then(function (inRole) {
                    expect(inRole).to.not.be.ok;
                    done();
                });
        });
    });
});
