'use strict';

module.exports = (function () {
    var user = {};
    var _context = Object.create(EventEmitter2.prototype, {
        user: {
            configurable: false,
            get: getUser,
            set: setUser
        }
    });

    function setUser(entity) {
        /*jshint validthis:true */

        user.info = entity.info;
        user.image = entity.image;

        this.emit('user::update');
    }

    function getUser() {
        return user;
    }

    return _context;
})();