'use strict';
let userService = require('../../libs/userService.es6');
let eventService = require('../../libs/events/eventService.es6');
let imageService = require('../../libs/images/imageService.es6');
let log = require('../../libs/logger/logger.es6.js')(module);
let handleError = require('./helpers.es6').handleError;

module.exports = (function () {
    function user(req, res, next, id) {
        userService.getUser(id)
            .then(function (user) {
                req.context.user = user;
                next();
            })
            .catch(handleError(res));
    }

    function event(req, res, next, id) {
        eventService.getEvent(id)
            .then(function (event) {
                req.context.event = event;
                next();
            })
            .catch(handleError(res));
    }

    function image(req, res, next, id) {
        imageService.getImage(id)
            .then(function (image) {
                req.context.image = image;
                next();
            })
            .catch(handleError(res));
    }

    return {
        user: user,
        event: event,
        image: image
    };
})();