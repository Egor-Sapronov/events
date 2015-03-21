'use strict';

/**
 * Observe for user model
 *
 * @event update::user when user updates
 */

module.exports = (function () {
    var user = {};
    var _context = Object.create(EventEmitter2.prototype, {
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
        /*jshint validthis:true */

        user.info = entity.info;
        user.image = entity.image;

        this.emit('update::user');
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