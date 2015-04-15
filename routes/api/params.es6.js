'use strict';
let userService = require('../../libs/userService.es6');
let eventService = require('../../libs/events/eventService.es6');
let imageService = require('../../libs/images/imageService.es6');
let log = require('../../libs/logger/logger.es6.js')(module);

module.exports = (function () {
    function user(req, res, next, id) {
        userService.getUser(id)
            .then(function (user) {
                req.context.user = user;
                next();
            })
            .catch(function (err) {
                log.error(err);
                res.status(400).end();
            });
    }

    function event(req, res, next, id) {
        eventService.getEvent(id)
            .then(function (event) {
                req.context.event = event;
                next();
            })
            .catch(function (err) {
                log.error(err);
                res.status(400).end();
            });
    }

    function image(req, res, next, id) {
        imageService.getImage(id)
            .then(function (image) {
                req.context.image = image;
                next();
            })
            .catch(function (err) {
                log.error(err);
                res.status(400).end();
            });
    }

    return {
        user: user,
        event: event,
        image: image
    };
})();