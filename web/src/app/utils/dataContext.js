'use strict';

function DataContext() {

}

DataContext.prototype = new EventEmitter2();

DataContext.prototype.loadUserInfo = function (token) {
    var _this = this;
    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/api/users/me');

    xhr.setRequestHeader('Authorization', 'Bearer ' + token);

    xhr.onload = function () {
        if (this.status === 200) {
            _this.user = JSON.parse(this.responseText);
            _this.emit('load::userinfo', null);
        }
    };

    xhr.send();
};

module.exports = new DataContext();