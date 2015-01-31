'use strict';

var Sequelize = require('sequelize'),
    sequelize = require('../data/database'),
    crypto = require('crypto'),

    User = sequelize.define('user', {
            username: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                unique: true,
                get: function () {
                    return this._plainPassword;
                },
                set: function (password) {
                    this._plainPassword = password;
                    this.setDataValue('salt', crypto.randomBytes(32).toString('base64'));
                    this.hashedPassword = encryptPassword(password, this.getDataValue('salt'));
                }
            },
            hashedPassword: {
                type: Sequelize.STRING
            },
            salt: {
                type: Sequelize.STRING
            }
        },
        {
            freezeTableName: true
        });

function encryptPassword(password, salt) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
}

module.exports = User;