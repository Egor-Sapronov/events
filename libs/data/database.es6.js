'use strict';

/**
 * Main db module
 */

let Sequelize = require('sequelize');
let sequelize = new Sequelize(process.env.DATABASE_URL, {logging: false});
let db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    User: sequelize.import('User', require('../model/user')),
    AccessToken: sequelize.import('AccessToken', require('../model/accessToken')),
    Event: sequelize.import('Event', require('../model/event')),
    Image: sequelize.import('Image', require('../model/image'))
};

db.AccessToken.belongsTo(db.User);

db.User.belongsToMany(db.Event, {through: 'UserEvents'});
db.Event.belongsToMany(db.User, {through: 'UserEvents'});


db.Event.belongsToMany(db.User, {
    as: 'Followers',
    through: 'EventFollow'
});

db.Image.hasOne(db.Event);


module.exports = db;