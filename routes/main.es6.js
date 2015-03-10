'use strict';

let router = require('express').Router();
let views = require('./views.es6');

router.use('/', views);

module.exports = router;