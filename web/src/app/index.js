'use strict';
var dataContext = require('./utils/dataContext');

dataContext.on('load::userinfo', function () {
    console.log(dataContext.user);
    toast('Successful sign up!', 4000);
});

$(document).ready(function () {
    if (location.hash.split('#')[1]) {
        dataContext.loadUserInfo(location.hash.split('#')[1]);
    }
});