'use strict';

var Sequelize = require('sequelize'),
    sequelize = require('../data/database'),

    Client = sequelize.define('Client', {
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        secret: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });


module.exports = Client;
