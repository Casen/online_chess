var dbclient = require('../utils/database-client');

module.exports = function(config) {
  return function databaseMiddleware (req, res, next) {
    req.db = dbclient(config);
    next();
  }
};
