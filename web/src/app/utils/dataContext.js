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
UserContext.prototype.profileImage = {};

/**
 *  Load user info for current user
 */
UserContext.prototype.loadUserInfo = function () {
    var _this = this;
    var token = _this.getToken();
    fetch('/api/users/me', {
        method: 'GET',
        headers: {
            "Authorization": "bearer " + token
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            _this.user = json;
        })
        .then(function () {
            return fetch('https://graph.facebook.com/v2.2/' + _this.user.providerId + '/picture?redirect=0&type=small');
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            _this.profileImage = json;
            _this.emit('load::user', null);
        });
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