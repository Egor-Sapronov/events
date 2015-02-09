'use strict';

var passport = require('passport'),
    authService = require('../libs/auth/authService'),
    router = require('express')
        .Router({
            caseSensitive: true,
            strict: true
        });

router.get('/token',
    passport.authenticate('basic', {session: false}),
    function (req, res) {
        authService.createToken(req.user)
            .then(function (token) {
                res.send({
                    token: token.token,
                    username: req.user.username
                });
            });
    });

module.exports = router;