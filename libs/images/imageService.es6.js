'use strict';

module.exports = (function () {
    let db = require('../data/database.es6');

    function createImage(event, path) {
        return db.Image
            .create({
                path: path
            })
            .then(function (image) {
                return image.setEvent(event);
            });
    }

    return {
        createImage: createImage
    };
})();