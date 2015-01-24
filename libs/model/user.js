var Sequelize = require('sequelize'),
    sequelize = require('../data/database');

var User = sequelize.define('user', {
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hashedPassword: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salt: {
            type: Sequelize.STRING,
            allowNull: false
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Date.now
        }
    },
    {
        freezeTableName: true
    });

module.exports.UserModel = User;