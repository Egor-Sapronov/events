'use strict';

var Sequelize = require('sequelize'),
    sequelize = require('../data/database'),

    Client = sequelize.define('client', {
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        secret: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

module.exports = Client;
