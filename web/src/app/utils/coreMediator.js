'use strict';

/**
 * Encapsulate interaction between modules
 *
 */

var userService = require('./users/userService');
var userContext = require('./users/userContext');
var profileBar = require('./../components/profileBar.react.jsx');

userService.on('load::user', function (user) {
    userContext.user = user;
});

userContext.on('update::user', function () {
    var user = userContext.user;

    React.render(
        React.createElement(
            profileBar,
            {imageSrc: user.image.url}),
        document.getElementById('profile-container'));
});
