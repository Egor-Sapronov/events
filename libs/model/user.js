'use strict';

var crypto = require('crypto');

function encryptPassword(password, salt) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
}

/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|Model} User model definition
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('User', {
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
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
                type: DataTypes.STRING,
                allowNull: false
            },
            salt: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            instanceMethods: {
                checkPassword: function (password) {
                    return encryptPassword(password, this.getDataValue('salt')) === this.getDataValue('hashedPassword');
                }
            },
            freezeTableName: true,
            paranoid: true
        });
};