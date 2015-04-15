// - external libs
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var requestLogger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

// - routes
var routes = require('./routes/index');
var tabList = require('./routes/tabList');
var tabulatur = require('./routes/tabulatur');
var feedback = require('./routes/feedback');
var login = require('./routes/login');

// - modules
var config = require('./modules/config');
var renderer = require('./modules/renderer');
var logger = require('./modules/logger');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(requestLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: config.getSessionSecret(),
    resave: false,
    saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/list', tabList);
app.use('/tab', tabulatur);
app.use('/feedback', feedback);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(error, request, response, next) {
        logger.error(error);
        renderer.renderErrorPage(response, error);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(error, request, response, next) {
    logger.error(error);
    renderer.renderErrorPage(response, error);
});


module.exports = app;
