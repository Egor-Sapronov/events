'use strict';

let router = require('express').Router();

router.use('/:id', function (req, res) {
    res.send(req.params.id);
});

router.use('/', function (req, res) {
    res.render('index');
});

module.exports = router;