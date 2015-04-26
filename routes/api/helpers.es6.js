'use strict';
let log = require('../../libs/logger/logger.es6.js')(module);

module.exports = (function () {

    function handleError(res) {
        return function (err) {
            log.error(err);
            res.status(400).send(JSON.stringify(err));
        };
    }

    return {
        handleError: handleError
    };
})();