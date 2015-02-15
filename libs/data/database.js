'use strict';

/**
 * Main db module
 */

var Sequelize = require('sequelize'),
    sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/test', {logging: false}),
    User = require('../model/user'),
    AccessToken = require('../model/accessToken'),
    Role = require('../model/role'),
    Event = require('../model/event'),
    db = {
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
db.Event.belongsTo(db.User);


/**
 * Subscribers are user who subscribe to the event, but not create it
 */
db.User.belongsToMany(db.Event, {through: 'Subscribers'});
db.Event.belongsToMany(db.User, {through: 'Subscribers'});

db.User.belongsToMany(db.Role, {through: 'UserRoles'});
db.Role.belongsToMany(db.User, {through: 'UserRoles'});

module.exports = db;