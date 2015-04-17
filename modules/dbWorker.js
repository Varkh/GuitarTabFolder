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
    title: {
        type: String,
        required: true
    },
    _author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postedDate: {
        type: Date,
        required: true
    },
    band: String,
    otherInfo: [String],
    body: {
        type: [String],
        required: true
    }
});

var commentSchema = mongoose.Schema({
    _tab: {
        type: Schema.Types.ObjectId,
        ref: 'Tab',
        required: true
    },
    _author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postedDate: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

var userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.validPassword = function validPassword (password) {
    return helper.getHash(password) === this.password;
};

var feedbackSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    name: String,
    email: String
});

var Tab = mongoose.model('Tab', tabSchema);
var Comment = mongoose.model('Comment', commentSchema);
var User = mongoose.model('User', userSchema);
var Feedback = mongoose.model('Feedback', feedbackSchema);

var publicMethods = {
    getTabModel: function() {
        return Tab;
    },
    getCommentModel: function() {
        return Comment;
    },
    getUserModel: function() {
        return User;
    },
    getFeedbackModel: function() {
        return Feedback;
    }
};

module.exports = publicMethods;