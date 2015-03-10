var expect = require('chai').expect;

describe('Database module', function () {
    var db = require('../../libs/data/database.es6');
    it('Should exist', function () {
        expect(db).to.be.ok;
    });
    describe('Exports', function () {
        describe('#sequelize', function () {
            it('Should exist', function () {
                expect(db.sequelize).to.be.ok;
            });
        });
        describe('#Sequelize', function () {
            it('Should exist', function () {
                expect(db.Sequelize).to.be.ok;
            });
        });
        describe('#User', function () {
            it('Should exist', function () {
                expect(db.User).to.be.ok;
            });
        });
        describe('#AccessToken', function () {
            it('Should exist', function () {
                expect(db.AccessToken).to.be.ok;
            });
        });
        describe('#Role', function () {
            it('Should exist', function () {
                expect(db.Role).to.be.ok;
            });
        });
        describe('#Event', function () {
            it('Should exist', function () {
                expect(db.Event).to.be.ok;
            });
        });
    });
});