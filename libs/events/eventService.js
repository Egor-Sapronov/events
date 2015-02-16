'use strict';

var db = require('../data/database');

function createEvent(user, eventData) {
    return db.Event.create(eventData)
        .then(function (event) {
            return event.setOwner(user);
        });

}

module.exports = {
    createEvent: createEvent
};
