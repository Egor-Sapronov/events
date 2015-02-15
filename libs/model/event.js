'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Event', {
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                is: /[a-z0-9A-Z-]{4,30}/
            }
        },
        description: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        freezeTableName: true,
        paranoid: true
    });
};
