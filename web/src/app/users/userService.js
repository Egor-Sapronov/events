'use strict';
var fetchUtils = require('../utils/fetchUtils');

/**
 * @module userService - Encapsulate data retrieval for user
 *
 * @function getUser - fetch user info and facebook profile image
 *
 * @return {Object} service
 */

module.exports = (function () {
    var _service = {
        getUser: getUser,
        getFacebookProfile: getFacebookProfile
    };

    /**
     * fetch user info and facebook profile image
     *
     * @param {string} token
     */
    function getUser(token) {
        return fetch('/api/users/me', {
            method: 'GET',
            headers: {
                "Authorization": "bearer " + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(fetchUtils.status)
            .then(fetchUtils.json);
    }

    function getFacebookProfile(id) {
        return fetch('https://graph.facebook.com/v2.2/' +
        id +
        '/picture?redirect=0&type=small')
            .then(fetchUtils.status)
            .then(fetchUtils.json);
    }

    return _service;
})();