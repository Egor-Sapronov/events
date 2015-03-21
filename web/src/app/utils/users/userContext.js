'use strict';

module.exports = (function () {
    var user = {};
    var _context;

    function UserContext() {

    }

    UserContext.prototype = new EventEmitter2();
    UserContext.prototype.setUser = setUser;
    UserContext.prototype.getUser = getUser;

    _context = new UserContext();

    function setUser(entity) {
        /*jshint validthis:true */

        user.info = entity.info;
        user.image = entity.image;

        this.emit('user::update');
    }

    function getUser() {
        return user;
    }

    function on(event, cb) {
        _context.on(event, cb);
    }

    return {
        on: on,
        setUser: _context.setUser,
        getUser: _context.getUser
    };
})();