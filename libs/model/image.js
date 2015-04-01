'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Image', {
        path: {
            type: DataTypes.STRING,
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
