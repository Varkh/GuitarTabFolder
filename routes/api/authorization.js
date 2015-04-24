var express = require('express');
var router = express.Router();
var passport = require('passport');

var authenticator = require('../../modules/authenticator');
var logger = require('../../modules/logger');
var helper = require('../../modules/helper');

router.post('/login', function(request, response, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return response.status(401).json({message: "Wrong!"});
        }
        request.logIn(user, function(err) {
            if (err) { return next(err); }
            return response.sendStatus(200);

        });
    })(request, response, next);
});

router.post('/register', function(request, response, next) {
    logger.debug("Register request");
    var userData = request.body;
    authenticator.addNewUser(userData, function (err, user) {
        if(err) {
            helper.wrapJsonError(response, err);
            return;
        }
        passport.authenticate('local')(req, res, function () {
            response.status(201);
        })
    });
});

module.exports = router;