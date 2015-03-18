'use strict';

var userContext = require('./utils/dataContext').userContext;
var profileBar = require('./components/profileBar.react.jsx');

userContext.on('load::user', function () {
    React.render(React.createElement(profileBar, {imageSrc: userContext.profileImage.url}), document.getElementById('profile-container'));
});

$(document).ready(function () {
    if (location.hash.split('#')[1]) {
        userContext.saveToken(location.hash.split('#')[1]);
        location.hash = '';
    }

    userContext.loadUserInfo();
});

