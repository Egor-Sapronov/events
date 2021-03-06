'use strict';

let db = require('../data/database.es6');
let userService = require('../userService.es6');

module.exports = (function () {
    /**
     * Create event for the user, who become event owner
     *
     * @param user event owner
     * @param eventData
     * @returns {Promise}
     */
    function createEvent(userId, eventData) {
        return db.Event.create(eventData)
            .then(function (event) {
                return userService.getUser(userId)
                    .then(function (user) {
                        return user.addEvent(event);
                    })
                    .then(function (relationShip) {
                        return db.Event.find({
                            where: {id: relationShip.EventId}
                        });
                    });
            });
    }

    function getUserEvents(userId) {
        return userService
            .getUser(userId)
            .then(function (user) {
                return user.getEvents({include: [{all: true}]});
            })
            .then(function (events) {
                return Promise.resolve(events.map(function (event) {
                    return mapEvent(event, event.Users[0]);
                }));
            });
    }

    function getFeed(userId) {
        return getUserEvents(userId);
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
            place: event.place,
            ImageId: event.ImageId,
            user: user,
            _metadata: {
                followUrl: 'http://events-dev.herokuapp.com/api/events/' + event.id + '/users'
            }
        };
    }

    return {
        createEvent: createEvent,
        getUserEvents: getUserEvents,
        getFeed: getFeed,
        followEvent: followEvent,
        getEvents: getEvents,
        getEvent: getEvent
    };
})();