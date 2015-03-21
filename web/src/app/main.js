'use strict';

var userContext = require('./utils/dataContext').userContext;
var profileBar = require('./components/profileBar.react.jsx');

userContext.on('load::user', function () {
    React.render(
        React.createElement(
            profileBar,
            {imageSrc: userContext.profileImage.url}),
        document.getElementById('profile-container'));
});