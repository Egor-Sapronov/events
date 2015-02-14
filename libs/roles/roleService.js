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
            if (!role) {
                return false;
            }

            return user.hasRole(role);
        });
}

/**
 * Check that user in request has role
 *
 * @param roleTitle
 * @returns {Function}
 */
function roleHandler(roleTitle) {
    return function (req, res, next) {
        if (!req.user) {
            res.status(500).end();
        }

        inRole(roleTitle, req.user)
            .then(function (result) {
                if (result) {
                    next();
                }

                res.status(401).end();
            });
    };
}

module.exports = {
    inRole: inRole,
    roleHandler: roleHandler
};
