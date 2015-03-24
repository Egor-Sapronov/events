'use strict';

/**
 * Main db module
 */

let Sequelize = require('sequelize');
let sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/test', {logging: false});
let db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    User: sequelize.import('User', require('../model/user')),
    AccessToken: sequelize.import('AccessToken', require('../model/accessToken')),
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

module.exports = db;