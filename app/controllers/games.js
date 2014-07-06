var middlewares = require('../middlewares');
var Game = require('../models/game');

//show a game
exports.show = function (config) {
  return [
    middlewares.auth.authWall(config),
    function show(req, res) {
      var gameId = req.id;
      var game = Game.find(gameId).success(function (game) {
        console.log(game);
      });
      res.render('profile', {game: game});
    }
  ]
};
