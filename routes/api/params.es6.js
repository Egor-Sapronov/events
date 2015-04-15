'use strict';
let userService = require('../../libs/userService.es6');
let eventService = require('../../libs/events/eventService.es6');
let imageService = require('../../libs/images/imageService.es6');
let log = require('../../libs/logger/logger.es6.js')(module);
let router = require('express').Router();

router.all('*', function (req, res, next) {
    // store data from route parameters
    req.context = {};
    next();
});

router.param('user', function (req, res, next, id) {
    userService.getUser(id)
        .then(function (user) {
            req.context.user = user;
            next();
        })
        .catch(function (err) {
            log.error(err);
            res.status(400).end();
        });
});

router.param('event', function (req, res, next, id) {
    eventService.getEvent(id)
        .then(function (event) {
            req.context.event = event;
            next();
        })
        .catch(function (err) {
            log.error(err);
            res.status(400).end();
        });
});

router.param('image', function (req, res, next, id) {
    imageService.getImage(id)
        .then(function (image) {
            req.context.image = image;
            next();
        })
        .catch(function (err) {
            log.error(err);
            res.status(400).end();
        });
});

module.exports = router;