'use strict';

/**
 * @module Storage for user model
 *
 * @return {Object} context
 */

module.exports = (function () {
    var user = {};
    var _context = Object.create(null, {
        user: {
            configurable: false,
            get: getUser,
            set: setUser
        }
    });

    /**
     * set user to context
     *
     * @param {object} user
     */
    function setUser(entity) {
        user = entity;
    }

    /**
     * get user from context
     *
     * @returns {object} user
     */
    function getUser() {
        return user;
    }

    return _context;
})();