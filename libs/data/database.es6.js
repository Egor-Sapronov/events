'use strict';

/**
 * Main db module
 */

let Sequelize = require('sequelize');
let config = require('../config.es6');
let sequelize = new Sequelize(config.get('db:url'), {logging: false});
let db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    User: sequelize.import('User', require('../model/user')),
    AccessToken: sequelize.import('AccessToken', require('../model/accessToken')),
    Role: sequelize.import('Role', require('../model/role')),
    Event: sequelize.import('Event', require('../model/event'))
};

db.AccessToken.belongsTo(db.User);

/**
 * Owner is user who create the event
 */
db.Event.belongsTo(db.User, {as: 'Owner'});

/**
 * Subscribers are user who subscribe to the event, but not create it
 */
db.User.belongsToMany(db.Event, {through: 'Subscribers'});
db.Event.belongsToMany(db.User, {through: 'Subscribers'});

db.User.belongsToMany(db.Role, {through: 'UserRoles'});
db.Role.belongsToMany(db.User, {through: 'UserRoles'});

module.exports = db;