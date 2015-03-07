var nconf = require('nconf');
nconf.argv()
    .env()
    .file({file: 'config.json'});

if (process.env.DATABASE_URL) {
    nconf.set('db:url', process.env.DATABASE_URL);
}

if (process.env.PORT) {
    nconf.set('app:port', process.env.PORT);
}

if (process.env.CLIENT_ID) {
    nconf.set('facebook:clientID', process.env.CLIENT_ID);
}
if (process.env.CLIENT_SECRET) {
    nconf.set('facebook:clientSecret', process.env.CLIENT_SECRET);
}
if (process.env.CALLBACK_URL) {
    nconf.set('facebook:callbackURL', process.env.CALLBACK_URL);
}

module.exports = nconf;