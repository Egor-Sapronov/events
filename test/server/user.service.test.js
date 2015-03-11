'use strict';

var expect = require('chai').expect;
var service = require('../../libs/userService.es6');
var db = require('../../libs/data/database.es6');

describe('User service, functions with users', function () {
    it('Should exist', function () {
        expect(service).to.be.ok;
    });

    describe('#getUser', function () {
        it('Should return user by id', function (done) {
            var user;
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        providerId: '1',
                        profileLink: 'https://link.com'
                    });
                })
                .then(function (entity) {
                    user = entity;
                    return service.getUser(user.id);
                })
                .then(function (entity) {
                    expect(entity.id).to.equal(user.id);
                    done();
                });
        });
    });
});