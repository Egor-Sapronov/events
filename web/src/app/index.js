'use strict';

var vent = require('./utils/mediator');
var eventService = require('./events/eventService');
var userContext = require('./users/userContext');

$(document).ready(function () {
    var token = location.hash.split('#')[1];
    if (token) {
        localStorage.setItem('token', token);
        location.hash = '';
    } else {
        token = localStorage.getItem('token');
    }

    vent.emit('change::token', token);

    eventService.getFeed(userContext.user.id).then(function (events) {
        vent.emit('load::feed', events);
    });
});

