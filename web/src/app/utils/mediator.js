'use strict';

/**
 * Encapsulate interaction between modules
 *
 */

var userContext = require('../users/userContext');
var userService = require('../users/userService');
var eventService = require('../events/eventService');
var profileBar = require('../components/profileBar.react.jsx');
var vent = require('./vent');

module.exports = (function (mediator) {
    mediator.on('load::user', function (user) {
        userContext.user = user;

        React.render(
            React.createElement(
                profileBar,
                {imageSrc: '/static/assets/img/empty_user.png'}),
            document.getElementById('profile-container'));

        userService
            .getFacebookProfile(user.providerId)
            .then(function (profile) {
                vent.emit('load::profile', profile.data);
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
                vent.emit('load::user', user);
            });
    });

    mediator.on('create::event', function () {

    });

    mediator.on('submit::event', function (data) {
        var token = localStorage.getItem('token');
        eventService.postEvent({
            userId: userContext.user.id,
            token: token,
            eventData: data
        });
    });

    return mediator;
})(vent);
