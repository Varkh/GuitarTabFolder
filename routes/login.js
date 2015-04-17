var express = require('express');
var router = express.Router();
var passport = require('passport');

var renderer = require('../modules/renderer');


router.get('/', function(request, response) {
    renderer.renderLoginPage(request, response);
});

router.post('/', function(request, response, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return response.status(401).json("Wrong!");
        }
        request.logIn(user, function(err) {
            if (err) { return next(err); }
            return response.sendStatus(200);

        });
    })(request, response, next);
});

module.exports = router;