'use strict';

module.exports = (function () {
    var _service = new UserService();

    function UserService() {

    }

    UserService.prototype = new EventEmitter2();
    UserService.prototype.checkAuth = checkAuth;

    function checkAuth(token) {
        /*jshint validthis:true */

        var _this = this;
        var user;

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
                user.info = json;
            })
            .then(function () {
                return fetch('https://graph.facebook.com/v2.2/' + user.info.providerId + '/picture?redirect=0&type=small');
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                user.image = json.data;
                _this.emit('auth::success', user);
            });
    }

    return {
        on: _service.on,
        checkAuth: _service.checkAuth
    };
})();