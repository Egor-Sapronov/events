'use strict';

var vent = require('./utils/mediator');
var eventService = require('./events/eventService');

$(document).ready(function () {
    var token = location.hash.split('#')[1];
    if (token) {
        localStorage.setItem('token', token);
        location.hash = '';
    } else {
        token = localStorage.getItem('token');
    }

    vent.emit('change::token', token);


    vent.on('save::user', function () {
        vent.emit('get::feed', null);
    });

});

