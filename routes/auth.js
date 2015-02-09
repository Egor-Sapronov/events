'use strict';

var passport = require('passport'),
    authService = require('../libs/auth/authService'),
    router = require('express')
        .Router({
            caseSensitive: true,
            strict: true
        });

router.get('/login',
    passport.authenticate('basic', {session: false}),
    function (req, res) {
        authService.createToken(req.user)
            .then(function (token) {
                res.status(200).send({
                    token: token.token,
                    username: req.user.username
                });
            });
    });

router.get('/logoff',
    passport.authenticate('bearer', {session: false}),
    function (req, res) {
        authService.logOff(req.user)
            .then(function () {
                res.status(200).end();
            });
    });

module.exports = router;