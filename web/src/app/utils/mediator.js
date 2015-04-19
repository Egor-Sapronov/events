'use strict';

/**
 * Encapsulate interaction between modules
 *
 */

var userService = require('../users/userService');
var eventService = require('../events/eventService');
var profileBar = require('../components/profileBar.react.jsx');
var vent = require('./vent');

module.exports = (function (mediator) {
    var context = {};

    mediator.on('load::user', function (user) {
        context.user = user;

        mediator.emit('save::user', null);

        React.render(
            React.createElement(
                profileBar,
                {imageSrc: '/static/assets/img/empty_user.png'}),
            document.getElementById('profile-container'));

        userService
            .getFacebookProfile(user.providerId)
            .then(function (profile) {
                mediator.emit('load::profile', profile.data);
            });
    });

    mediator.on('load::profile', function (profile) {
        React.render(
            React.createElement(
                profileBar,
                {imageSrc: profile.url}),
            document.getElementById('profile-container'));
    });

    mediator.on('change::token', function (token) {
        userService
            .getUser(token)
            .then(function (user) {
                mediator.emit('load::user', user);
            });
    });

    mediator.on('create::event', function () {

    });

    mediator.on('get::feed', function () {
        eventService.getFeed(context.user.id)
            .then(function (events) {
                mediator.emit('load::feed', events);
            });
    });

    mediator.on('load::feed', function (events) {
        //var items = events.map(function (item) {
        //    return {
        //        image:item.ImageId+'.png'
        //    };
        //});
    });

    mediator.on('submit::event', function (data) {
        var token = localStorage.getItem('token');
        eventService.postEvent({
            userId: context.user.id,
            token: token,
            eventData: data
        });
    });

    return mediator;
})(vent);
