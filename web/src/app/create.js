'use strict';

require('./utils/coreMediator');
var userService = require('./utils/users/userService');
var eventCreate = require('./components/eventCreate.react.jsx');
var eventService = require('./utils/events/eventService');
var userContext = require('./utils/users/userContext');

$(document).ready(function () {
    var token = localStorage.getItem('token');
    userService.getUser(token);

    function handleSubmit(data) {
        eventService.postEvent({
            userId: userContext.user.info.id,
            token: token,
            eventData: data
        });
    }

    React.render(
        React.createElement(
            eventCreate,
            {
                onSubmit: handleSubmit
            }),
        document.getElementById('create-container'));

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15
    });
});



