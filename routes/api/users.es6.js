'use strict';

let router = require('express').Router();
let passport = require('../../libs/auth/auth.es6').passport;

router.get('/me', passport.authenticate('bearer', {sessions: false}), function (req, res) {
    res.send(req.user);
});

router.get('/:id', function (req, res) {

});

module.exports = router;