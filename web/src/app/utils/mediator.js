'use strict';

/**
 * Encapsulate interaction between modules
 *
 */

var userService = require('../users/userService');
var eventService = require('../events/eventService');
var profileBar = require('../components/profileBar.react.jsx');
var feedComponent = require('../components/feed.react.jsx');
var vent = require('./vent');

module.exports = (function (mediator) {
    var context = {};

    mediator.on('load::user', function (user) {
        context.user = user;

        mediator.emit('save::user', null);

        React.render(
            React.createElement(
                profileBar,
                {imageSrc: 'https://graph.facebook.com/' + user.providerId + '/picture?type=small'}),
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

    mediator.on('follow::event', function () {

    });

    mediator.on('get::feed', function () {
        eventService.getFeed(context.user.id)
            .then(function (events) {
                mediator.emit('load::events', events);
            });
    });

    mediator.on('get::events', function () {
        eventService.getEvents()
            .then(function (events) {
                mediator.emit('load::events', events);
            });
    });

    mediator.on('load::events', function (events) {
        var items = events.map(mapEvent);

        React.render(
            React.createElement(
                feedComponent,
                {
                    items: items,
                    onFollowClick: function (link) {
                        mediator.emit('follow::click', link);
                    }
                }),
            document.getElementById('feed-container'));
    });

    mediator.on('follow::click', function (url) {
        var options = {
            url: url,
            token: localStorage.getItem('token')
        };

        eventService.followEvent(options)
            .then(function () {
                mediator.emit('follow::event', null);
            });
    });

    mediator.on('submit::event', function (data) {
        var token = localStorage.getItem('token');
        eventService
            .postEvent({
                userId: context.user.id,
                token: token,
                eventData: data
            })
            .then(function () {
                mediator.emit('create::event', null);
            });
    });

    function mapEvent(event) {
        return {
            image: 'https://events-images-store.s3.amazonaws.com/' + event.ImageId + '.png',
            title: event.title,
            userImage: 'https://graph.facebook.com/' + event.user.providerId + '/picture?type=small',
            place: event.place,
            date: moment(event.date).format('MMMM do YYYY'),
            description: event.description,
            followUrl: event._metadata.followUrl
        };
    }

    return mediator;
})(vent);
