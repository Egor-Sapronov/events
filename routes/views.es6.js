'use strict';

let router = require('express').Router();

router.get('/create', function (req, res) {
    res.render('create');
});

router.get('/:id', function (req, res) {
    res.send(req.params.id);
});

router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;