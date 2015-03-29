'use strict';

var fetchUtils = require('../fetchUtils');
var EventEmitter = require('eventemitter2');

/**
 * @module eventService - Encapsulate data retrieval for events
 *
 * @function postEvent - create new event for the given user
 *
 * @return {Object} service
 */

module.exports = (function () {
    var _service = Object.create(EventEmitter.prototype);

    _service.postEvent = postEvent;

    function postEvent(options) {
        /*jshint validthis:true */

        var _this = this;

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
                _this.emit('create::event', json);
            })
            .catch(function (err) {
                _this.emit('error', err);
            });
    }

    return _service;
})();