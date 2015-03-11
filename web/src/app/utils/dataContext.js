'use strict';

/**
 * Provide access for operations with users
 *
 * @constructor
 */
function UserContext() {

}

UserContext.prototype = new EventEmitter2();

UserContext.prototype.user = {};

/**
 *  Load user info for current user
 */
UserContext.prototype.loadUserInfo = function () {
    var _this = this;
    var xhr = new XMLHttpRequest();
    var token = _this.getToken();

    if (!token) {
        _this.emit('error::token', null);
    } else {
        xhr.open('GET', '/api/users/me');

        xhr.setRequestHeader('Authorization', 'Bearer ' + token);

        xhr.onload = function () {
            if (this.status === 200) {
                _this.user = JSON.parse(this.responseText);
                _this.emit('load::userinfo', null);
            }
        };

        xhr.send();
    }
};

UserContext.prototype.saveToken = function (token) {
    localStorage.setItem('token', token);
};

UserContext.prototype.getToken = function () {
    return localStorage.getItem('token');
};

module.exports = {
    userContext: new UserContext()
};