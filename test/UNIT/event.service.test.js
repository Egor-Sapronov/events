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
                    expect(event.OwnerId).to.be.ok;

                    return event.getOwner();
                })
                .then(function (user) {
                    expect(user).to.be.ok;
                    done();
                });
        });

        it('Should throw error if event validation fail', function (done) {
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
                        title: 'test'
                    });
                })
                .catch(function (err) {
                    expect(err).to.be.ok;
                    done();
                });
        });
    });

    describe('#subscribeEvent', function () {
        it('Should subscribe user to event', function (done) {
            var subscriber, event, owner;
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function (entity) {
                    owner = entity;
                    return eventService.createEvent(owner, {
                        title: 'test',
                        description: 'Test description'
                    });
                })
                .then(function (entity) {
                    event = entity;
                    return db.User.create({
                        username: 'egor2',
                        password: '123456',
                        email: 'sapronov2.egor@gmail.com'
                    });
                })
                .then(function (entity) {
                    subscriber = entity;
                    return eventService.subscribeEvent(subscriber, event.id);
                })
                .then(function (entity) {
                    expect(entity).to.be.ok;
                    return event.hasUser(subscriber);
                })
                .then(function (result) {
                    expect(result).to.be.ok;
                    return event.getOwner();
                })
                .then(function (result) {
                    expect(result.id).to.equal(owner.id);
                    done();
                })
        });

        it('Should throw error if event validation fail', function (done) {
            var subscriber, event, owner;
            db.sequelize.sync({force: true})
                .then(function () {
                    return db.User.create({
                        username: 'egor',
                        password: '123456',
                        email: 'sapronov.egor@gmail.com'
                    });
                })
                .then(function (entity) {
                    owner = entity;
                    return eventService.createEvent(owner, {
                        title: 'test',
                        description: 'Test description'
                    });
                })
                .then(function (entity) {
                    event = entity;
                    return db.User.create({
                        username: 'egor2',
                        password: '123456',
                        email: 'sapronov2.egor@gmail.com'
                    });
                })
                .then(function (entity) {
                    subscriber = entity;
                    return eventService.subscribeEvent(subscriber, 'bad id');
                })
                .catch(function (err) {
                    expect(err).to.be.ok;
                    done();
                });
        });
    });
});