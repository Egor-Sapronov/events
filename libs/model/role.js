'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Role', {
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlphanumeric: true
            }
        }
    }, {
        freezeTableName: true,
        paranoid: true
    });
};
