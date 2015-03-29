'use strict';
var fetchUtils = require('../fetchUtils');

module.exports = (function () {
    var _service = Object.create(EventEmitter2.prototype);

    _service.postEvent = postEvent;

    function postEvent(options) {
        /*jshint validthis:true */

        var _this = this;

        fetch('/api/users/' + options.userId + '/events', {
            method: 'POST',
            headers: {
                "Authorization": "bearer " + options.token
            },
            body: JSON.stringify(options.eventData)
        });
    }

    return _service;
})();