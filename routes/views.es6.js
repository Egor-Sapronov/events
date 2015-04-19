'use strict';

let router = require('express').Router();

router.get('/create', ensureAuthenticated, function (req, res) {
    res.render('create');
});

router.get('/feed', ensureAuthenticated, function (req, res) {
    res.render('feed');
});

router.get('/:id', function (req, res) {
    res.send(req.params.id);
});

router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated() || (process.env.NODE_ENV === 'local')) {
        return next();
    }
    res.redirect('/');
}