'use strict';

var db = require('../data/database');

/**
 * Return true if user in role else return false
 *
 * @param roleTitle
 * @param user
 * @returns {Bluebird.Promise|*}
 */
function inRole(roleTitle, user) {
    return db.Role
        .find({where: {title: roleTitle}})
        .then(function (role) {
            if (!role)
                return false;

            return user.hasRole(role);
        });
}

module.exports = {
    inRole: inRole
};
