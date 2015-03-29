'use strict';

var vent = require('./utils/mediator');

$(document).ready(function () {
    var token = location.hash.split('#')[1];
    if (token) {
        localStorage.setItem('token', token);
        location.hash = '';
    } else {
        token = localStorage.getItem('token');
    }

    vent.emit('change::token', token);
});

