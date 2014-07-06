exports.auth = require('./auth');
exports.games = require('./games');
exports.users = require('./users');

exports.index = function (req, res) {
  res.render('index.ejs');
};
