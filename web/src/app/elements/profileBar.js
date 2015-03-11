'use strict';

var userContext = require('../utils/dataContext').userContext;

userContext.on('load::userinfo', function () {
    console.table(userContext.user);
});

function init() {
    userContext.loadUserInfo();
}

module.exports = {
    init: init
};