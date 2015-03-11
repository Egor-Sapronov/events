'use strict';

let db = require('./data/database.es6');

/**
 * get user by id
 *
 * @param {string} user id
 */
function getUser(id) {
    return db.User.find({where: {id: id}});
}

module.exports = {
    getUser: getUser
};
