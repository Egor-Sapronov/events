'use strict';

var db = require('../data/database');

/**
 * Create event for the user, who become event owner
 *
 * @param user event owner
 * @param eventData
 * @returns {Bluebird.Promise|*}
 */
function createEvent(user, eventData) {
    return db.Event.create(eventData)
        .then(function (event) {
            return event.setOwner(user);
        });
}

/**
 * Subscribe user for the event
 *
 * @param user event subscriber
 * @param eventId
 * @returns {Bluebird.Promise|*}
 */
function subscribeEvent(user, eventId) {
    return db.Event.find({
        where: {
            id: eventId
        }
    }).then(function (event) {
        return event.addUser(user);
    });
}

module.exports = {
    createEvent: createEvent,
    subscribeEvent: subscribeEvent
};
