'use strict';

let router = require('express').Router();

router.get('/create', ensureAuthenticated, function (req, res) {
    res.render('create');
});

router.get('/feed', ensureAuthenticated, function (req, res) {
    res.render('feed');
});

router.get('/home', function (req, res) {
    res.render('landing');
});

router.get('/landing', function (req, res) {
    res.render('landing');
});

router.get('/homeold', function (req, res) {
    res.render('home');
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