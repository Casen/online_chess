var express = require('express');
var middlewares = require('./middlewares');
var controllers = require('./controllers');

module.exports = function(config) {
  var router = new express.Router();

  router.get('/', controllers.index);

  //Auth
  router.get('/auth/facebook', controllers.auth.fbAuth(config));
  router.get('/auth/facebook/callback', controllers.auth.fbAuthCallback(config));
  router.get('/logout', controllers.auth.logout(config));

  //User endpoints
  router.get('/dashboard', controllers.users.dashboard(config));

  //Game endpoints
  router.get('/games/:id', controllers.games.show(config));

  return router.middleware;
};

