'use strict';

let nconf = require('nconf');
nconf.argv()
    .env()
    .file({file: 'config.json'});

/* istanbul ignore if  */
if (process.env.DATABASE_URL) {
    nconf.set('db:url', process.env.DATABASE_URL);
}
/* istanbul ignore if  */
if (process.env.PORT) {
    nconf.set('app:port', process.env.PORT);
}
/* istanbul ignore if  */
if (process.env.CLIENT_ID) {
    nconf.set('facebook:clientID', process.env.CLIENT_ID);
}
/* istanbul ignore if  */
if (process.env.CLIENT_SECRET) {
    nconf.set('facebook:clientSecret', process.env.CLIENT_SECRET);
}
/* istanbul ignore if  */
if (process.env.CALLBACK_URL) {
    nconf.set('facebook:callbackURL', process.env.CALLBACK_URL);
}

module.exports = nconf;