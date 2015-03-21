'use strict';

var userContext = require('./utils/dataContext').userContext;

$(document).ready(function () {
    if (location.hash.split('#')[1]) {
        userContext.saveToken(location.hash.split('#')[1]);
        location.hash = '';
    }

    userContext.loadUserInfo();
});

