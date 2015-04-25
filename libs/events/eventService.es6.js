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

    function getFeed(user) {
        return db.User
            .find({where: {id: user.id}})
            .then(function (user) {
                return user
                    .getEvents();
            })
            .then(function (events) {
                Promise.resolve(events.map(function (event) {
                    return mapEvent(event, user);
                }));
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
        return db.Event.findAll({include: [{all: true}]})
            .then(function (events) {
                return Promise.resolve(events.map(function (event) {
                    return mapEvent(event, event.Users[0]);
                }));
            });
    }

    function mapEvent(event, user) {
        return {
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.date,
            place: event.date,
            ImageId: event.ImageId,
            user: user
        };
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