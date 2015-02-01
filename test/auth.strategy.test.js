var expect = require('chai').expect,
    User = require('../libs/model/user'),
    AccessToken = require('../libs/model/accessToken'),
    sequelize = require('../libs/data/database'),
    basicStrategy = require('../libs/auth/strategy').basicStategy,
    bearerStrategy = require('../libs/auth/strategy').bearerStategy;

describe('Auth strategy', function () {
    describe('#basicStrategy', function () {

    });

    describe('#bearerStrategy', function () {

    });
});