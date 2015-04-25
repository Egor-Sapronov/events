'use strict';

let db = require('../data/database.es6');
let fetch = require('fetch');

module.exports = (function () {
    /**
     * Create event for the user, who become event owner
     *
     * @param user event owner
     * @param eventData
     * @returns {Promise}
     */
    function createEvent(user, eventData) {
        return db.Event.create(eventData)
            .then(function (event) {
                return user.addEvent(event);
            })
            .then(function (relationShip) {
                return db.Event.find({
                    where: {id: relationShip.EventId}
                });
            });
    }

    function getCreatedEvents(user) {
        return user.getEvents();
    }

    function getFeed(userId) {
        return db.User
            .find({where: {id: userId}})
            .then(function (user) {
                return user
                    .getEvents();
            });
    }

    function followEvent(eventId, userId) {
        return db.User
            .find({where: {id: userId}})
            .then(function (user) {
                return db.Event
                    .find({where: {id: eventId}})
                    .then(function (event) {
                        return event.addFollowers(user);
                    });
            });
    }

    function getEvent(id) {
        return db.Event
            .find({where: {id: id}});

    }

    function getEvents() {
        return db.Event.findAll()
            .then(function (events) {
                return new Promise.all(events.map(function (event) {
                    return new Promise(function (resolve, reject) {
                        db.User.find({where: {id: event.id}})
                            .then(function (user) {
                                resolve({
                                    event: event,
                                    user: user
                                });
                            });
                    });
                }));
            });
    }

    return {
        createEvent: createEvent,
        getCreatedEvents: getCreatedEvents,
        getFeed: getFeed,
        followEvent: followEvent,
        getEvents: getEvents,
        getEvent: getEvent
    };
})();