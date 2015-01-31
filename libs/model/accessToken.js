'use strict';

var Sequelize = require('sequelize'),
    User = require('./user'),
    Client = require('./client'),
    sequelize = require('../data/database'),

    AccessToken = sequelize.define('client', {
        token: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }
    });

AccessToken.belongsTo(User);
AccessToken.belongsTo(Client);

module.exports = AccessToken;

