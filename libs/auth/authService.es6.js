'use strict';

let db = require('../data/database.es6');

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

/**
 * Return token for the user
 *
 * @param   {object}  user
 * @returns {object}  promise
 */
function getToken(user) {
    return db.AccessToken.find({where: {UserId: user.id}});
}

module.exports = {
    saveToken: saveToken,
    getToken: getToken
};
