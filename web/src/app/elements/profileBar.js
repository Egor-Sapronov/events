'use strict';

var userContext = require('../utils/dataContext').userContext;
var profileBar = require('../components/profileBar.react.jsx');

userContext.on('load::user', function () {
    console.table(userContext.user);
    React.render(profileBar, {imageSrc: userContext.profileImage.url}, document.getElementById('profile-cotainer'));
});

function init() {
    userContext.loadUserInfo();
}

module.exports = {
    init: init
};