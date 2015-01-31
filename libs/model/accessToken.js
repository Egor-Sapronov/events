'use strict';

var Sequelize = require('sequelize'),
    Client = require('./client'),
    User = require('./user'),
    sequelize = require('../data/database'),

    AccessToken = sequelize.define('AccessToken', {
        token: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

AccessToken.belongsTo(Client);
AccessToken.belongsTo(User);

module.exports = AccessToken;

