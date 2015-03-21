'use strict';

let passport = require('passport');
let router = require('express').Router();
let authService = require('../libs/auth/authService.es6');

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/facebook', passport.authenticate('facebook', {
    session: true,
    scope: ['email', 'public_profile', 'user_about_me', 'user_photos']
}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        session: true
    }),
    function (req, res) {
        authService.getToken(req.user)
            .then(function (token) {
                res.redirect('/#' + token.token);
            });
    });

module.exports = router;