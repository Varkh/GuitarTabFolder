var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var dbWorker = require('../modules/dbWorker');
var logger = require('../modules/logger');
var helper = require('../modules/helper');

var User = dbWorker.getUserModel();

var publicMethods = {
    initPassport: function () {
        passport.use(new LocalStrategy(
            function(username, password, done) {
                User.findOne({ username: username }, function (err, user) {
                    logger.debug("Login request check");
                    if (err) { return done(err); }
                    if (!user) {
                        return done(null, false, { message: 'Incorrect username.' });
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                });
            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });

        //TODO remove init
//        this.addNewUser({
//            username: "admin",
//            email: "",
//            password: "Welcome!"
//        });
    },

    addNewUser: function(userData) {
            var newUser = new User({
                username: userData.username,
                email: userData.email,
                password: helper.getHash(userData.password)
            });
            newUser.save();
    }
};

module.exports = publicMethods;