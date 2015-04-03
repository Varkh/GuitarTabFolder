var dbWorker = require('../modules/dbWorker');
var helper = require('../helper');

var Tab = dbWorker.getTabModel();
var Comment = dbWorker.getCommentModel();

function getTab(tabId, callback) {
    Tab.findOne({ tabId: tabId }, callback);
}

function getTabs(callback) {
    Tab.find(callback);
}

function addTab(newTabData, callback) {
    var tabId = helper.generateUrlFromName(newTabData.title);
    var tabInfo = (newTabData.info) ? newTabData.info.split('\n') : [];

    var newTab = new Tab({
        tabId: tabId,
        title: newTabData.title,
        postedDate: helper.getCurentFormatedDate(),
        band: newTabData.band,
        otherInfo: tabInfo,
        body: newTabData.body.split('\n')
    });
    newTab.save(callback);
}

function editTab(tabId, tabData, callback) {
    var id = { tabId: tabId };
    var tabInfo = (tabData.info) ? tabData.info.split('\n') : [];
    var update = {
        title: tabData.title,
        band: tabData.band,
        otherInfo: tabInfo,
        body: tabData.body.split('\n')
    };
    Tab.findOneAndUpdate(id, update, callback);
}

function getLastTabNames(callback) {
    Tab.find()
        .sort('-postedDate')
        .limit(10)
        .select('tabId title')
        .exec(callback);
}

function addComment(tabId, author, date, text, callback) {
    var comment = new Comment({
        _tab: tabId,
        author: author,
        postedDate: date,
        text: text
    });
    comment.save(callback);
}


exports.getTab = getTab;
exports.getTabs = getTabs;
exports.addTab = addTab;
exports.editTab = editTab;
exports.getLastTabNames = getLastTabNames;
exports.addComment = addComment;