'use strict';

var fetchUtils = require('../fetchUtils');
var vent = require('../vent');

/**
 * @module eventService - Encapsulate data retrieval for events
 *
 * @function postEvent - create new event for the given user
 *
 * @return {Object} service
 */

module.exports = (function (mediator) {
    var _service = {
        postEvent: postEvent
    };

    function postEvent(options) {
        fetch('/api/users/' + options.userId + '/events', {
            method: 'POST',
            headers: {
                "Authorization": "bearer " + options.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options.eventData)
        })
            .then(fetchUtils.status)
            .then(fetchUtils.json)
            .then(function (json) {
                mediator.emit('create::event', json);
            })
            .catch(function (err) {
                mediator.emit('error', err);
            });
    }

    return _service;
})(vent);