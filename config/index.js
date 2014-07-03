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
      host: 'localhost',
      port: 8080
    }
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
