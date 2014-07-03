var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var lodash    = require('lodash');
var db        = {};

module.exports = function(config) {
  var dbConfig = config.database;
  var dir = __dirname + '/../models/';
  var sequelize = new Sequelize(
      dbConfig.name,
      dbConfig.username,
      dbConfig.password);

  sequelize
    .authenticate()
    .complete(function (err) {
      if(!!err) {
        throw 'Unable to connect to database';
      } else {
        console.log('connected to database');
      }
    });

  fs
    .readdirSync(dir)
    .filter(function(file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
      var model = sequelize.import(path.join(dir, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  return lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
  }, db);
};

