'use strict';

let router = require('express').Router();
let passport = require('../../libs/auth/auth.es6').passport;
let userService = require('../../libs/userService.es6');
let eventService = require('../../libs/events/eventService.es6');

router.post('/users/:id/events', passport.authenticate('bearer', {session: false}), function (req, res) {
    eventService.createEvent(req.user, req.body)
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

router.get('/users/:id/events', function (req, res) {
    userService.getUser(req.params.id)
        .then(function (user) {
            return eventService.getCreatedEvents(user);
        })
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

router.get('/users/:id', function (req, res) {
    userService.getUser(req.params.id)
        .then(function (user) {
            if (user) {
                res.send({
                    displayName: user.displayName,
                    name: user.name,
                    id: user.id,
                    providerId: user.providerId,
                    gender: user.gender
                });
            } else {
                res.status(404).end();
            }
        });
});

module.exports = router;