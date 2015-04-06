var dbWorker = require('../modules/dbWorker');

var Tab = dbWorker.getTabModel();
var Feedback = dbWorker.getFeedbackModel();
var logger = require('../modules/logger');

function searchForTab(query, callback) {
    var q = query.toLowerCase();
    logger.debug('Search for: ' + q);
    Tab.find({
        $or:[
            {tabId: q},
            {title: q}
        ]
    })//TODO not working if title has space(without $or works well)
        .select('tabId')
        .exec(callback);
}

function addFeedback(text, name, email, callback) {
    var feedback = new Feedback({
        text: text
    });
    if(name) feedback.set('name', name);
    if(email) feedback.set('email', email);

    feedback.save(callback);
}

exports.searchForTab = searchForTab;
exports.addFeedback = addFeedback;