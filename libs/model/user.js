'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('User', {
            providerId: {
                type: DataTypes.STRING,
                unique: true
            },
            provider: {
                type: DataTypes.STRING
            },
            profileLink: {
                type: DataTypes.STRING,
                unique: true
            },
            displayName: {
                type: DataTypes.STRING
            },
            name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            gender: {
                type: DataTypes.STRING
            }
        },
        {
            freezeTableName: true,
            paranoid: true
        });
};