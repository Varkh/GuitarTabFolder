var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var config = require('../modules/config');
var logger = require('../modules/logger');
var helper = require('../modules/helper');

mongoose.connect(config.getDbUrl());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    logger.info("Connected to DB on " + config.getDbUrl());
});

var tabSchema = mongoose.Schema({
    tabId: {
        type: String,
        unique: true
    },
    title: String,
    postedDate: Date,
    band: String,
    otherInfo: [String],
    body: [String]
});

var commentSchema = mongoose.Schema({
    _tab: {type: Schema.Types.ObjectId, ref: 'Tab'},
    author: String,
    postedDate: Date,
    text: String
});

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});

userSchema.methods.validPassword = function validPassword (password) {
    return helper.getHash(password) === this.password;
};

var feedbackSchema = mongoose.Schema({
    text: String,
    name: String,
    email: String
});

var Tab = mongoose.model('Tab', tabSchema);
var Comment = mongoose.model('Comment', commentSchema);
var User = mongoose.model('User', userSchema);
var Feedback = mongoose.model('Feedback', feedbackSchema);

function getTabModel() {
    return Tab;
}

function getCommentModel() {
    return Comment;
}

function getUserModel() {
    return User;
}

function getFeedbackModel() {
    return Feedback;
}

exports.getTabModel = getTabModel;
exports.getCommentModel = getCommentModel;
exports.getUserModel = getUserModel;
exports.getFeedbackModel = getFeedbackModel;