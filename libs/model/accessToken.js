'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('AccessToken', {
        token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};