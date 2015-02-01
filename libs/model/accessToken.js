'use strict';

var Sequelize = require('sequelize'),
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

AccessToken.belongsTo(User);

module.exports = AccessToken;

