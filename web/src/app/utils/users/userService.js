'use strict';
var fetchUtils = require('../fetchUtils');

/**
 * Encapsulate data retrieval for user
 *
 * @event auth::success when user info and profile image load successful
 * @event auth::error on request error
 */

module.exports = (function () {
    var _service = Object.create(EventEmitter2.prototype);

    _service.getUser = getUser;

    /**
     * fetch user info and facebook profile image
     *
     * @param {string} token
     */
    function getUser(token) {
        /*jshint validthis:true */

        var _this = this;
        var user = {};

        fetch('/api/users/me', {
            method: 'GET',
            headers: {
                "Authorization": "bearer " + token
            }
        })
            .then(fetchUtils.status)
            .then(fetchUtils.json)
            .then(function (json) {
                user.info = json;
            })
            .then(function () {
                return fetch('https://graph.facebook.com/v2.2/' +
                user.info.providerId +
                '/picture?redirect=0&type=small');
            })
            .then(fetchUtils.status)
            .then(fetchUtils.json)
            .then(function (json) {
                user.image = json.data;
                _this.emit('load::user', user);
            })
            .catch(function (err) {
                _this.emit('error', err);
            });
    }

    return _service;
})();