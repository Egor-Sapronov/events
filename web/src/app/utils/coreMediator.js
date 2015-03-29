'use strict';

/**
 * Encapsulate interaction between modules
 *
 */

var userContext = require('./users/userContext');
var profileBar = require('./../components/profileBar.react.jsx');
var vent = require('./vent');

module.exports = (function (mediator) {
    mediator.on('load::user', function (user) {
        userContext.user = user;

        React.render(
            React.createElement(
                profileBar,
                {imageSrc: user.image.url}),
            document.getElementById('profile-container'));
    });

    return mediator;
})(vent);
