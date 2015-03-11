'use strict';

let router = require('express').Router();
let views = require('./views.es6');
let profile = require('./profile.es6');
let auth = require('./auth.es6');

router.use('/auth', auth);
router.use('/', profile);
router.use('/', views);

module.exports = router;