'use strict';

let router = require('express').Router();

router.get('/create', ensureAuthenticated, function (req, res) {
    res.render('create');
});

router.get('/feed', ensureAuthenticated, function (req, res) {
    res.render('feed');
});

router.get('/home', function (req, res) {
    res.render('index');
});

router.get('/', ensureAuthenticated, function (req, res) {
    res.redirect('feed');
});

module.exports = router;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/home');
}