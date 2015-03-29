'use strict';

let router = require('express').Router();
let passport = require('../../libs/auth/auth.es6').passport;
let userService = require('../../libs/userService.es6');

router.get('/users/me', passport.authenticate('bearer', {session: false}), function (req, res) {
    res.send({
        displayName: req.user.displayName,
        name: req.user.name,
        id: req.user.id,
        providerId: req.user.providerId,
        gender: req.user.gender
    });
});

router.post('/users/:id/events', passport.authenticate('bearer', {session: false}), function (req, res) {
    res.send(req.body);
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