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
                res.send({
                    token: token.token,
                    username: req.user.username
                });
            })
            .catch(function () {
                res.send(400);
            });
    });

router.get('/logoff',
    passport.authenticate('bearer', {session: false}),
    function (req, res) {
        authService.logOff(req.user)
            .then(function () {
                res.send(200);
            })
            .catch(function () {
                res.send(400);
            });
    });

module.exports = router;