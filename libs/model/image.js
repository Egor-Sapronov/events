'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Image', {
        path: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        }
    }, {
        freezeTableName: true,
        paranoid: true
    });
};
