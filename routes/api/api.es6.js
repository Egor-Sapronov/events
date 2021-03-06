'use strict';

let router = require('express').Router();
let passport = require('../../libs/auth/auth.es6').passport;
let multer = require('multer');
let eventService = require('../../libs/events/eventService.es6');
let amazonService = require('../../libs/images/amazonService.es6');
let imageService = require('../../libs/images/imageService.es6');
let apiParams = require('./params.es6');
let fs = require('fs');
let handleError = require('./helpers.es6').handleError;

router.all('*', function (req, res, next) {
    // store data from route parameters
    req.context = {};
    next();
});

router.param('user', apiParams.user);
router.param('image', apiParams.image);
router.param('event', apiParams.event);

router.get('/users/:user/feed', function (req, res) {
    eventService.getFeed(req.context.user.id)
        .then(function (events) {
            res.send(events);
        })
        .catch(handleError(res));
});

router.post('/users/:user/events/:event/images/:image',
    passport.authenticate('bearer', {session: false}),
    multer({dest: './uploads/'}),
    function (req, res) {
        var file = fs.createReadStream(req.files.file.path);
        amazonService.upload(file, req.context.image.id)
            .then(function (data) {
                return imageService.updatePath(req.context.image, data.Location);
            })
            .then(function (image) {
                fs.unlink(req.files.file.path, function () {
                    res.status(201).send(JSON.stringify({
                        id: image.id,
                        path: image.path
                    }));
                });
            })
            .catch(handleError(res));
    });

router.post('/users/:user/events',
    passport.authenticate('bearer', {session: false}),
    function (req, res) {
        eventService
            .createEvent(req.context.user.id, req.body)
            .then(function (event) {
                return imageService.createImage(event);
            })
            .then(function (event) {
                res.status(201).send(JSON.stringify({
                    title: event.title,
                    description: event.description,
                    date: event.date,
                    place: event.place,
                    imageId: event.ImageId,
                    _metadata: {
                        image: {
                            url: '/api/users/' + req.context.user.id +
                            '/events/' + event.id +
                            '/images/' + event.ImageId
                        }
                    }
                }));
            })
            .catch(handleError(res));
    });

/**
 * Follow event
 */
router.post('/events/:event/users',
    passport.authenticate('bearer', {session: false}),
    function (req, res) {
        eventService.followEvent(req.context.event.id, req.user.id)
            .then(function () {
                res.status(201).end();
            })
            .catch(handleError(res));
    });

router.get('/users/:user/events', function (req, res) {
    eventService.getUserEvents(req.context.user.id)
        .then(function (events) {
            res.status(200).send(events);
        })
        .catch(handleError(res));
});

router.get('/users/me', passport.authenticate('bearer', {session: false}), function (req, res) {
    res.send({
        displayName: req.user.displayName,
        name: req.user.name,
        id: req.user.id,
        providerId: req.user.providerId,
        gender: req.user.gender
    });
});

router.get('/events', function (req, res) {
    eventService
        .getEvents()
        .then(function (result) {
            res.send(result);
        })
        .catch(handleError(res));
});

router.get('/users/:user', function (req, res) {
    res.send({
        displayName: req.context.user.displayName,
        name: req.context.user.name,
        id: req.context.user.id,
        providerId: req.context.user.providerId,
        gender: req.context.user.gender
    });
});

module.exports = router;