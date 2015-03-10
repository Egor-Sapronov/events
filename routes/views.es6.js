'use strict';

let router = require('express').Router();

router.use('/', function (req, res) {
    res.render('index');
});

module.exports = router;