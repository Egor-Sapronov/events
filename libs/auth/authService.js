'use strict';

let db = require('../data/database');

/**
 * Save facebook access token
 *
 * @param  {object}  user
 * @param  {string}  access token
 * @return {object}  promise
 */
function saveToken(user, token) {
    return db.AccessToken
        .destroy({where: {UserId: user.id}})
        .then(function () {
            return db.AccessToken
                .create({
                    token: token,
                    UserId: user.id
                });
        });
}

module.exports = {
    saveToken: saveToken
};
