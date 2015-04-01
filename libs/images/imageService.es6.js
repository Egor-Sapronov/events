'use strict';

module.exports = (function () {
    let db = require('../data/database.es6');

    function createImage(event) {
        return db.Image
            .create({
                path: null
            })
            .then(function (image) {
                return image.setEvent(event);
            });
    }

    function updatePath(image, path) {
        return image.update({path: path});
    }

    return {
        createImage: createImage,
        updatePath: updatePath
    };
})();