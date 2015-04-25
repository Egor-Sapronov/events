'use strict';

let expect = require('chai').expect;

describe('Event service', function () {
    let service = require('../../libs/events/eventService.es6');
    let db = require('../../libs/data/database.es6');

    it('Should exist', function () {
        expect(service).to.be.ok;
    });

    describe('#createEvent', function () {
        it('Should create new event from event data and set user as event owner', function (done) {
            let eventData = {
                title: 'test title',
                description: 'test description',
                date: new Date(),
                place: 'test place'
            };

            db.sequelize
                .sync({force: true})
                .then(function () {
                    return db.User
                        .create({
                            providerId: '1',
                            profileLink: 'https://link.com'
                        });
                })
                .then(function (user) {
                    return service.createEvent(user, eventData)
                        .then(function (event) {
                            expect(event.title).to.be.equal(eventData.title);
                            expect(event.description).to.be.equal(eventData.description);
                            expect(event.date.toString()).to.be.equal(eventData.date.toString());
                            expect(event.place).to.be.equal(eventData.place);

                            return user.hasEvent(event);
                        })
                        .then(function (result) {
                            expect(result).to.be.ok;

                            return user.getEvents();
                        })
                        .then(function (events) {
                            expect(events.length).to.be.equal(1);
                            done();
                        });

                });


        });
    });

    describe('#getEvent', function () {
        it('Should return event by id', function (done) {
            db.sequelize
                .sync({force: true})
                .then(function () {
                    return db.Event.create({
                        title: 'test title',
                        description: 'test description',
                        date: new Date(),
                        place: 'test place'
                    });
                })
                .then(function (event) {
                    return service.getEvent(event.id);
                })
                .then(function (event) {
                    expect(event).to.be.ok;
                    done();
                });
        });
    });

    describe('#getFeed', function () {
        it('Should return array of events created by user', function (done) {
            let eventData = {
                title: 'test title',
                description: 'test description',
                date: new Date(),
                place: 'test place'
            };
            db.sequelize
                .sync({force: true})
                .then(function () {
                    return db.User
                        .create({
                            providerId: '1',
                            profileLink: 'https://link.com'
                        });
                })
                .then(function (user) {
                    return service.createEvent(user, eventData)
                        .then(function () {
                            return service.createEvent(user, eventData);
                        })
                        .then(function () {
                            return service.createEvent(user, eventData);
                        })
                        .then(function () {
                            return service.createEvent(user, eventData);
                        })
                        .then(function () {
                            return service.getFeed(user.id);
                        })
                        .then(function (result) {
                            expect(result).to.be.ok;
                            expect(result.length).to.be.equal(4);
                            done();
                        });
                });
        });
    });

    describe('#getCreatedEvents', function () {
        it('Should return all events created by user', function (done) {
            let eventData = {
                title: 'test title',
                description: 'test description',
                date: new Date(),
                place: 'test place'
            };

            db.sequelize
                .sync({force: true})
                .then(function () {
                    return db.User
                        .create({
                            providerId: '1',
                            profileLink: 'https://link.com'
                        });
                })
                .then(function (user) {
                    return service.createEvent(user, eventData)
                        .then(function () {
                            return service.getCreatedEvents(user);
                        })
                        .then(function (events) {
                            expect(events.length).to.be.equal(1);
                            done();
                        });
                });

        });
    });

    describe('#getEvents', function () {
        it('Should return all events', function (done) {
            let eventData = {
                title: 'test title',
                description: 'test description',
                date: new Date(),
                place: 'test place'
            };

            db.sequelize
                .sync({force: true})
                .then(function () {
                    return db.User
                        .create({
                            providerId: '1',
                            profileLink: 'https://link.com'
                        });
                })
                .then(function (user) {
                    return service.createEvent(user, eventData)
                        .then(function () {
                            return service.getEvents();
                        })
                        .then(function (events) {
                            events.map(function (event) {
                                expect(event).to.be.ok;
                            });
                            done();
                        });
                });

        });
    });

    describe('#followEvent', function () {
        it('Should add user to event followers', function (done) {
            let eventData = {
                title: 'test title',
                description: 'test description',
                date: new Date(),
                place: 'test place'
            };

            db.sequelize
                .sync({force: true})
                .then(function () {
                    return db.User
                        .create({
                            providerId: '1',
                            profileLink: 'https://link.com'
                        });
                })
                .then(function (user) {
                    return service.createEvent(user, eventData);
                })
                .then(function (event) {
                    return db.User
                        .create({
                            providerId: '2',
                            profileLink: 'https://lignk.com'
                        })
                        .then(function (user) {
                            service.followEvent(event.id, user.id)
                                .then(function (result) {
                                    expect(result).to.be.ok;

                                    return event.getFollowers();
                                })
                                .then(function (followers) {
                                    expect(followers.length).to.be.equal(1);

                                    done();
                                });
                        });
                });
        });
    });
});