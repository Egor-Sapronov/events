'use strict';
let expect = require('chai').expect;

describe('Image service', function () {
    let db = require('../../libs/data/database.es6');
    let service = require('../../libs/images/imageService.es6');

    describe('#createImage', function () {
        it('Should create new image for the event with given path', function (done) {
            let eventData = {
                title: 'test title',
                description: 'test description',
                date: new Date(),
                place: 'test place'
            };
            db.sequelize
                .sync({force: true})
                .then(function () {
                    return db.Event.create(eventData);
                })
                .then(function (event) {
                    return service.createImage(event);
                })
                .then(function (event) {
                    expect(event.ImageId).to.be.ok;
                    done();
                });
        });
    });

    describe('#updatePath', function () {
        it('Should update path for the image', function (done) {
            db.sequelize
                .sync({force: true})
                .then(function () {
                    return db.Image
                        .create({
                            path: 'test'
                        });
                })
                .then(function (image) {
                    return service.updatePath(image, 'test2');
                })
                .then(function (image) {
                    expect(image.path).to.be.equal('test2');
                    done();
                });
        });
    });
});