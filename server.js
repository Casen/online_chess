var express  = require('express');
var url = require('url');
var passport = require('passport');
var flash    = require('connect-flash');
var routes = require('./app/routes');


function Server(config) {

  var app = express();

  // save these for later
  this.app = app;
  this.config = config;

  // Setup the database client with the config
  this.dbClient = require('./app/utils/database-client')(config)

  // set up our express application
  app.use(express.static(__dirname + '/build'));
  app.use(express.logger('dev')); // log every request to the console
  app.use(express.cookieParser()); // read cookies (needed for auth)
  app.use(express.bodyParser()); // get information from html forms

  app.set('view engine', 'ejs'); // set up ejs for templating
  app.set('views', __dirname + '/app/views');

  // required for passport
  app.use(express.session({ secret: 'ASDK@#$(ASDFJ@#$(SJFSDFLSDF(@#$*@#$*@#$SDFKLGLTO' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session



  require('./config/passport')(this, passport); // pass passport for configuration
  this.config.passport = passport;

  // routes ======================================================================
  app.use(routes(this.config));

}

Server.prototype.listen = function () {
  var urlConfig = this.config.url;
  this._app = this.app.listen(urlConfig.port);
  console.log('Listening on: ' + url.format(urlConfig));
};

module.exports = Server;
