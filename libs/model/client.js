'use strict';

var Sequelize = require('sequelize'),
    sequelize = require('../data/database'),

    Client = sequelize.define('client', {
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        clientSecret: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

module.exports = Client;
