var express  = require('express');
var url = require('url');
var passport = require('passport');
var flash    = require('connect-flash');
var configAuth = require('./config/auth');


function Server(config) {

  var app      = express();

  // Setup the database client with the config
  var db = require('./app/utils/database-client')(config)

  // save these for late
  this.app = app;
  this.config = config;



  // set up our express application
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev')); // log every request to the console
  app.use(express.cookieParser()); // read cookies (needed for auth)
  app.use(express.bodyParser()); // get information from html forms

  app.set('view engine', 'ejs'); // set up ejs for templating

  // required for passport
  app.use(express.session({ secret: 'ASDK@#$(ASDFJ@#$(SJFSDFLSDF(@#$*@#$*@#$SDFKLGLTO' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session



  require('./config/passport')(db, passport); // pass passport for configuration

  // routes ======================================================================
  require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

}

Server.prototype.listen = function () {
  var urlConfig = this.config.url;
  this._app = this.app.listen(urlConfig.port);
  console.log('Listening on: ' + url.format(urlConfig));
};

module.exports = Server;
