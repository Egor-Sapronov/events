'use strict';

var vent = require('./utils/mediator');

$(document).ready(function () {
    var token = localStorage.getItem('token');
    vent.emit('change::token', token);

    vent.emit('get::events', null);
});