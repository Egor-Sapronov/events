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

    function getEvent(id) {
        return db.Event.find({where: {id: id}});
    }

    function getEvents() {
        return db.Event.findAll();
    }

    return {
        createEvent: createEvent,
        getCreatedEvents: getCreatedEvents,
        getFeed: getFeed,
        getEvents: getEvents,
        getEvent: getEvent
    };
})();