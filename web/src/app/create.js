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
        var signedData = data._metadata.image.signed_data;
        form.append('file', file);
        form.append('Content-Type', 'image/png');
        form.append('ACL', 'public-read');
        form.append('key', signedData.imageName);
        form.append('AWSAccessKeyId', signedData.AWSAccessKeyId);
        form.append('Expires', signedData.Expires);
        form.append('Signature', signedData.Signature);


        fetch(data._metadata.image.url, {
            method: 'POST',
            body: form
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



