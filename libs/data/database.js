'use strict';

var Sequelize = require('sequelize'),
    sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/mydb');

module.exports = sequelize;