var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var renderer = require('../modules/renderer');

passport.use(new LocalStrategy(
    function(username, password, done) {
        //TODO get User
        done(null, {});
    }
));

router.get('/', function(request, response) {
    renderer.renderLoginPage(response);
});

router.post('/',
    passport.authenticate('local'),
    function(request, response) {
    //renderer.renderLoginPage(response);
});

module.exports = router;