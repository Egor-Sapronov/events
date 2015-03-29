'use strict';

module.exports = (function () {
    var EventEmitter = require('eventemitter2');
    var vent = new EventEmitter();

    return vent;
})();