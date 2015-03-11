'use strict';

let router = require('express').Router();

router.use('/:id', function (req, res) {
    res.send(req.params.id);
});

module.exports = router;