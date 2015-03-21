'use strict';

require('./utils/coreMediator');
var userService = require('./utils/users/userService');

$(document).ready(function () {
    if (location.hash.split('#')[1]) {
        localStorage.setItem('token', location.hash.split('#')[1]);
        location.hash = '';
    }
    userService.getUser(localStorage.getItem('token'));
});

