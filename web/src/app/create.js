'use strict';

var vent = require('./utils/mediator');
var eventForm = require('./components/eventForm.react.jsx');
var eventService = require('./events/eventService');
var userContext = require('./users/userContext');

$(document).ready(function () {
    var token = localStorage.getItem('token');
    vent.emit('change::token', token);

    function handleSubmit(data) {
        eventService.postEvent({
            userId: userContext.user.info.id,
            token: token,
            eventData: data
        });
    }

    React.render(
        React.createElement(
            eventForm,
            {
                onSubmit: handleSubmit
            }),
        document.getElementById('create-container'));

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15
    });
});



