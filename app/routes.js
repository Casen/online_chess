var fb      = require('../lib/facebook');
var mongoose = require('mongoose');
var User = require('./models/user');
var Game = require('./models/game');

module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res) {
    res.render('index.ejs'); // load the index.ejs file
  });

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    var token = req.user.facebook.token;
    fb.api(token, '/me/friends', function (friends) {
      friends = JSON.parse(friends);
      res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
      });
    });
  });


  app.get('/games/:id', function (req, res) {
    var gameId = mongoose.Schema.ObjectId(req.id);
    var game = Game.findOne({_id: gameId}).populate('black').populate('white');
    console.log(game);
    res.render('profile', {game: game});
  });

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

