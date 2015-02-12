Events
===
[![Build Status](https://travis-ci.org/Egor-Sapronov/events.svg?branch=develop)](https://travis-ci.org/Egor-Sapronov/events)

This repository for my diploma project in computer science.

Goal of the project is help people find information about public events all over the world. This would be a web application build on modern technologies. [Node.js](http://nodejs.org) + [postrges](http://www.postgresql.org)([Sequelize ORM](http://sequelizejs.com)) on server. [Materializecss](http://materializecss.com) + [React](http://facebook.github.io/react/) on client side.

Features
===
- social network for events and people who visit it
- subscribe on the event and take notification about how the event is going on
- smart events search and recommendations
- user generated content — you don't need to be a big company to create event, just make it real good
- karma system for user interaction — only users with good karma be able to create events
- raise karma on social actions like: comments, likes, shares
- ...

Project structure
===
- libs
    - auth — auth logic
    - data — db main module
    - model — sequelize models
- test — unit tests
- app.js — nodejs server
- index.js — project entry point
- package.json — project dependencies
- Procfile — heroku settings

build
==
    npm i

start
==
    npm start

test
==
Using [chai](http://chaijs.com) for unit testing and [supertest](https://github.com/visionmedia/supertest) for e2e testing http endpoints, testing framework is [mocha](http://mochajs.org)
    npm test

