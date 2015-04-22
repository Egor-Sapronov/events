'use strict';

var fetchUtils = require('../utils/fetchUtils');
var vent = require('../utils/vent');

/**
 * @module eventService - Encapsulate data retrieval for events
 *
 * @function postEvent - create new event for the given user
 *
 * @return {Object} service
 */

module.exports = (function (mediator) {
    var _service = {
        postEvent: postEvent,
        getFeed: getFeed,
        getEvents: getEvents
    };

    var optionsGet = {
        method: 'GET', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    function postEvent(options) {
        return fetch('/api/users/' + options.userId + '/events', {
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


    function getFeed(id) {
        return fetch('/api/users/' + id + '/feed', optionsGet)
            .then(fetchUtils.status)
            .then(fetchUtils.json);
    }

    function getEvents() {
        return fetch('/api/events', optionsGet)
            .then(fetchUtils.status)
            .then(fetchUtils.json);
    }

    return _service;
})(vent);