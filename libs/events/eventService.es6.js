'use strict';

let db = require('../data/database.es6');


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

    return {
        createEvent: createEvent,
        getCreatedEvents: getCreatedEvents
    };
})();

