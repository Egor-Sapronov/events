'use strict';

require('./utils/coreMediator');
var userService = require('./utils/users/userService');


$(document).ready(function () {
    userService.getUser(localStorage.getItem('token'));

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15
    });
});



