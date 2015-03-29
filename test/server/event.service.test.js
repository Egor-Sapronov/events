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
});