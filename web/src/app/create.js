'use strict';

var vent = require('./utils/mediator');

$(document).ready(function () {
    var token = localStorage.getItem('token');
    vent.emit('change::token', token);
    var titleInput = document.getElementById('title');
    var descriptionInput = document.getElementById('description');
    var placeInput = document.getElementById('place');
    var fileInput = document.getElementById('eventImage');
    var eventForm = document.getElementById('eventForm');
    var dateInput = $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 15
    });

    vent.on('create::event', function (data) {
        var form = new FormData();
        var file = fileInput.files[0];
        form.append('file', file);


        fetch(data._metadata.image.url, {
            method: 'POST',
            body: form,
            headers: {
                "Authorization": "bearer " + token
            }
        });
    });

    eventForm.onsubmit = function (e) {
        var tempEvent = {
            title: titleInput.value,
            description: descriptionInput.value,
            place: placeInput.value,
            date: dateInput[0].value
        };

        e.preventDefault();
        vent.emit('submit::event', tempEvent);
    };


});



