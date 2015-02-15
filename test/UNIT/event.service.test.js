var expect = require('chai').expect,
    db = require('../../libs/data/database'),
    eventService = require('../../libs/events/eventService');

describe('Event service', function () {
    describe('#createEvent', function () {
        it('Should create event for user', function (done) {
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function (user) {
                    return eventService.createEvent(user, {
                        title: 'test',
                        description: 'Test description'
                    });
                })
                .then(function (event) {
                    expect(event).to.be.ok;
                    expect(event.UserId).to.be.ok;

                    return event.getUser();
                })
                .then(function (user) {
                    expect(user).to.be.ok;
                    done();
                });
        });
    });
});