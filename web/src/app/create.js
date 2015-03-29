'use strict';

var vent = require('./utils/mediator');
var eventForm = require('./components/eventForm.react.jsx');

$(document).ready(function () {
    var token = localStorage.getItem('token');
    vent.emit('change::token', token);

    function handleSubmit(data) {
        vent.emit('submit::event', data);
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



