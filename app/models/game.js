var mongoose = require('mongoose');
var User = require('./user');

// define the schema for our user model
var gameSchema = mongoose.Schema({

  white    : {type: mongoose.Schema.ObjectId, ref: User.schema},
  black    : {type: mongoose.Schema.ObjectId, ref: User.schema},
  pgn      : String,
  state    : String


});

// create the model for users and expose it to our app
module.exports = mongoose.model('Game', gameSchema);
