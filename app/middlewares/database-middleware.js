var dbclient = require('../utils/database-client');

module.exports = function(config) {
  return databaseMiddleware function (req, res, next) {
    req.db = dbclient(config);
    next();
  }
};
