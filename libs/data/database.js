'use strict';

/**
 * Main db module
 */

var Sequelize = require('sequelize'),
    sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/test', {logging: false}),
    User = require('../model/user'),
    AccessToken = require('../model/accessToken'),
    Role = require('../model/role'),
    db = {
        sequelize: sequelize,
        Sequelize: Sequelize,
        User: sequelize.import('User', User),
        AccessToken: sequelize.import('AccessToken', AccessToken),
        Role: sequelize.import('Role', Role)
    };

db.AccessToken.belongsTo(db.User);

db.User.belongsToMany(db.Role);
db.Role.belongsToMany(db.User);

module.exports = db;