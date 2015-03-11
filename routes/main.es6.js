'use strict';

let router = require('express').Router();
let views = require('./views.es6');
let auth = require('./auth.es6');
let api = require('./api/api.es6');

router.use('/api', api);
router.use('/auth', auth);
router.use('/', views);

module.exports = router;