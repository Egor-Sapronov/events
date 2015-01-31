var expect = require('chai').expect,
    Client = require('../libs/model/client'),
    basicStrategy = require('../libs/auth/strategy').basicStategy;

describe('Auth strategy', function(){
    describe('#basicStrategy', function () {
        it('Should return client if exist and password correct', function (done) {
            Client.sync({force: true})
                .then(function () {
                    return Client.create({
                        name: 'web',
                        secret: '123456'
                    });
                })
                .then(function () {
                    basicStrategy('web', '123456', function (err, client) {
                        expect(err).to.equal(null);
                        expect(client.name).to.equal('web');
                        done();
                    });
                });
        });

        it('Should return null if not exist', function (done) {
            Client.sync({force: true})
                .then(function () {
                    return Client.create({
                        name: 'web',
                        secret: '123456'
                    });
                })
                .then(function () {
                    basicStrategy('web2', '123456', function (err, client) {
                        expect(err).to.equal(null);
                        expect(client).to.equal(false);
                        done();
                    });
                });
        });
    });
});