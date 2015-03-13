'use strict';
var userContext = require('./utils/dataContext').userContext;
var profileBar = require('./elements/profileBar');

$(document).ready(function () {
    if (location.hash.split('#')[1]) {
        userContext.saveToken(location.hash.split('#')[1]);
        profileBar.init();
    } else {
        if (userContext.getToken()) {
            profileBar.init();
        }
    }
    //
    //$(".side-activator").sideNav({
    //    edge: 'right',
    //    closeOnClick: true
    //});
});

