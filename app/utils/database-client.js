var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var lodash    = require('lodash');
var models    = {};

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
      models[model.name] = model;
    });

  Object.keys(models).forEach(function(modelName) {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  return {
    models: lodash.extend({
      sequelize: sequelize,
      Sequelize: Sequelize
    }, models),
    db: sequelize
  }
};

