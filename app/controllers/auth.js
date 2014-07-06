exports.fbAuth = function (config) {
  return [
    config.passport.authenticate('facebook', { scope : 'email' })
  ]
};

exports.fbAuthCallback = function (config) {
  return [
    config.passport.authenticate('facebook', {
      successRedirect : '/dashboard',
      failureRedirect : '/'
    })
  ]
};

exports.logout = function (config) {
  return [
    function logout(req, res) {
      req.logout();
      res.redirect('/');
    }
  ]
};
