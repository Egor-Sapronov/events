'use strict';

let router = require('express').Router();
let passport = require('../../libs/auth/auth.es6').passport;
let userService = require('../../libs/userService.es6');

router.get('/me', passport.authenticate('bearer', {sessions: false}), function (req, res) {
    res.send(req.user);
});

router.get('/:id', function (req, res) {
    userService.getUser(req.params.id)
        .then(function (user) {
            res.send(user);
        });
});

module.exports = router;