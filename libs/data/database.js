'use strict';

/**
 * Main db module
 */

var Sequelize = require('sequelize');
var config = require('../config');
var sequelize = new Sequelize(config.get('db:url'), {logging: false});
var User = require('../model/user');
var AccessToken = require('../model/accessToken');
var Role = require('../model/role');
var Event = require('../model/event');
var db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    User: sequelize.import('User', User),
    AccessToken: sequelize.import('AccessToken', AccessToken),
    Role: sequelize.import('Role', Role),
    Event: sequelize.import('Event', Event)
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