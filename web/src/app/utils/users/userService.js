'use strict';
var fetchUtils = require('../fetchUtils');
var EventEmitter = require('eventemitter2');
/**
 * @module userService - Encapsulate data retrieval for user
 *
 * @function getUser - fetch user info and facebook profile image
 *
 * @return {Object} service
 */

module.exports = (function () {
    var _service = Object.create(EventEmitter.prototype);

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
                "Authorization": "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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