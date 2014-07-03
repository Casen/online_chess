var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');

module.exports = function(server, passport) {

  var User = server.db.User;
  var facebookAuth = server.config.facebookAuth;
  console.log(facebookAuth.callbackURL);

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.find(id).success(function(user) {
      done(null, user);
    });
  });

  passport.use(new FacebookStrategy({
    // pull in our app id and secret from our auth.js file
    clientID        : facebookAuth.clientID,
    clientSecret    : facebookAuth.clientSecret,
    callbackURL     : facebookAuth.callbackURL
  },

  // facebook will send back the token and profile
  function(token, refreshToken, profile, done) {

    process.nextTick(function() {

      // find the user in the database based on their facebook id
      User.find({ where: {facebook_id: profile.id} }).success(function(user) {

        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        } else {

          // set all of the facebook information in our user model
          User.create({
            facebook_id:    profile.id, // set the users facebook id
            facebook_token: token, // we will save the token that facebook provides to the user
            first_name:     profile.name.givenName,
            last_name:      profile.name.familyName,
            email:          profile.emails[0].value // facebook can return multiple emails so we'll take the first
          }).success(function (newUser) {
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
