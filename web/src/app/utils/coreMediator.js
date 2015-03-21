'use strict';

var userService = require('./users/userService');
var userContext = require('./users/userContext');
var profileBar = require('./../components/profileBar.react.jsx');

userService.on('auth::success', function (user) {
    userContext.setUser(user);
});

userContext.on('user::update', function () {
    var user = userContext.getUser();

    React.render(
        React.createElement(
            profileBar,
            {imageSrc: user.image.url}),
        document.getElementById('profile-container'));
});
