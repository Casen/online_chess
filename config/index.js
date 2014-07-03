var url = require('url');
var Settings = require('shallow-settings');

var configs = {
  common: {
    database: {
      name: 'chess_online',
      username: 'root',
      password: null,
      host: '127.0.0.1',
      port: 3306,
      dialect: 'mysql'
    },
    url: {
      protocol: 'http',
      hostname: 'localhost',
      port: 8080
    },
    facebookAuth: Settings.lazy(function () {
      return {
        clientID    : '608969422491715',
        clientSecret  : 'fca566d9138176c7ecea872ddf62c420',
        callbackURL   : url.format(this.url) + '/auth/facebook/callback'
      }
    })
  },
  local: {
  },
  production: {
  },
  development: {
  },
  test: {
  }
}

var settings = new Settings(configs);
module.exports = settings;
