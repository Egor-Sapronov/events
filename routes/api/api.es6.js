'use strict';

let router = require('express').Router();
let passport = require('../../libs/auth/auth.es6').passport;
let userService = require('../../libs/userService.es6');
let eventService = require('../../libs/events/eventService.es6');

router.all('*', function (req, res, next) {
    req.context = {};
    next();
});

router.param('user', function (req, res, next, id) {
    userService.getUser(id)
        .then(function (user) {
            req.context.user = user;
        })
        .catch(function (err) {
            res.status(400).end();
        });
});

router.post('/users/:user/events', passport.authenticate('bearer', {session: false}), function (req, res) {
    eventService.createEvent(req.context.user, req.body)
        .then(function (event) {
            res.status(201).send({
                title: event.title,
                description: event.description,
                date: event.date,
                place: event.place
            });
        })
        .catch(function (err) {
            res.status(400).end();
        });
});

router.get('/users/:user/events', function (req, res) {
    eventService.getCreatedEvents(req.context.user)
        .then(function (events) {
            res.status(200).send(events);
        })
        .catch(function (err) {
            res.status(400).end();
        });
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