'use strict';

let router = require('express').Router();
let users = require('./users.es6');

router.use('/users', users);

module.exports = router;