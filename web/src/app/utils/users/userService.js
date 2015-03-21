'use strict';
var fetchUtils = require('../fetchUtils');

module.exports = (function () {
    var _service = Object.create(EventEmitter2.prototype);

    _service.checkAuth = checkAuth;

    function checkAuth(token) {
        /*jshint validthis:true */

        var _this = this;
        var user = {};

        fetch('/api/users/me', {
            method: 'GET',
            headers: {
                "Authorization": "bearer " + token
            }
        })
            .then(fetchUtils.status)
            .then(fetchUtils.json)
            .then(function (json) {
                user.info = json;
            })
            .then(function () {
                return fetch('https://graph.facebook.com/v2.2/' + user.info.providerId + '/picture?redirect=0&type=small');
            })
            .then(fetchUtils.status)
            .then(fetchUtils.json)
            .then(function (json) {
                user.image = json.data;
                _this.emit('auth::success', user);
            })
            .catch(function (err) {
                _this.emit('auth::error', err);
            });
    }

    return _service;
})();