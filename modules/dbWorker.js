var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../modules/config');
var logger = require('../modules/logger');

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

});

var feedbackSchema = mongoose.Schema({
    text: String,
    name: String,
    email: String
});

var Tab = mongoose.model('Tab', tabSchema);
var Comment = mongoose.model('Comment', commentSchema);
var Feedback = mongoose.model('Feedback', feedbackSchema);

function getTabModel() {
    return Tab;
}

function getCommentModel() {
    return Comment;
}

function getFeedbackModel() {
    return Feedback;
}

exports.getTabModel = getTabModel;
exports.getCommentModel = getCommentModel;
exports.getFeedbackModel = getFeedbackModel;