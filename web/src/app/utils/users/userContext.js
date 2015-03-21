'use strict';

module.exports = (function () {
    var user = {};
    var _context;

    function UserContext() {

    }

    UserContext.prototype = new EventEmitter2();
    UserContext.prototype.setUser = setUser;
    UserContext.prototype.getUser = getUser;

    function setUser(entity) {
        /*jshint validthis:true */

        user.info = entity.info;
        user.image = entity.image;

        this.emit('user::update');
    }

    function getUser() {
        return user;
    }

    _context = new UserContext();

    return {
        on: _context.on,
        setUser: _context.setUser,
        getUser: _context.getUser
    };
})();