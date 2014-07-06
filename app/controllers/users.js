var fb      = require('../../lib/facebook');
var middlewares = require('../middlewares');

exports.dashboard = function (config) {
  return [
    middlewares.auth.authWall(config),
    function dashboard(req, res) {
      var token = req.user.facebook_token;
      fb.api(token, '/me/friends', function (friends) {
        friends = JSON.parse(friends);
        res.render('profile.ejs', {
          user : req.user, // get the user out of session and pass to template
          friends: friends
        });
      });
    }
  ]
};
