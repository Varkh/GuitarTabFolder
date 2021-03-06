var dbWorker = require('../modules/dbWorker');
var helper = require('../modules/helper');
var logger = require('../modules/logger');
var authenticator = require('../modules/authenticator')

var Tab = dbWorker.getTabModel();
var Comment = dbWorker.getCommentModel();
var User = dbWorker.getUserModel();

var publicMethods = {
    getTab: function(tabId, callback) {
        Tab.findOne({ tabId: tabId })
            .populate('_author', 'username')
            .exec(callback);
    },

    getTabs: function(callback) {
        Tab.find(callback);
    },

    addTab: function(newTabData, callback) {
        User.findOne({ username: newTabData.username }, function(error, user) {
            var tabId = helper.generateUrlFromName(newTabData.title);
            var tabInfo = (newTabData.info) ? newTabData.info.split('\n') : [];

            var newTab = new Tab({
                tabId: tabId,
                title: newTabData.title,
                _author: user._id,
                postedDate: helper.getCurentFormatedDate(),
                band: newTabData.band,
                otherInfo: tabInfo,
                body: newTabData.body.split('\n')
            });
            newTab.save(callback);
        });
    },

    editTab: function(tabId, tabData, callback) {
        var id = { tabId: tabId };
        var tabInfo = (tabData.info) ? tabData.info.split('\n') : [];
        var update = {
            title: tabData.title,
            band: tabData.band,
            otherInfo: tabInfo,
            body: tabData.body.split('\n')
        };
        Tab.findOneAndUpdate(id, update, callback);
    },

    deleteTab: function(request, callback) {
        var tabId = request.tabName;
        Tab.findOne({ tabId: tabId })
            .select('_id _author')
            .exec(function (err, tab) {
                if(err) {
                    callback(err);
                    return;
                }
                if(!tab) {
                    callback({'status': '404', 'error': 'Non found'});
                    return;
                }
                if(!authenticator.isOwner(request, tab._author)) {
                    callback({'status': '403', 'error': 'Forbidden'});
                    return;
                }
                logger.debug("About to delete tab: " + tab.tabId);
                Tab.findOne({ _id: tab._id }).remove(function () {
                    Comment.find({_tab: tab._id}).remove(callback);
                });
        });
    },

    getLastTabNames: function(callback) {
        Tab.find()
            .sort('-postedDate')
            .limit(10)
            .select('tabId title')
            .exec(callback);
    },

    addComment: function(tabId, username, date, text, callback) {
        Tab.findOne({ tabId: tabId }, '_id', function (err, tab) {
            User.findOne({ username: username }, '_id', function(error, user) {
                var comment = new Comment({
                    _tab: tab._id,
                    _author: user._id,
                    postedDate: date,
                    text: text
                });
                var opts = [ { path: '_author', select: 'username' } ];
                comment.save(function(err, comment) {
                    Comment.populate(comment, opts, callback);
                });
            });
        });
    },
    getTabComments: function(tabId, callback) {
        Tab.findOne({ tabId: tabId }, '_id', function (err, tab) {
            if(!tab) {
                callback();
                return;
            }
            Comment.find({_tab: tab._id})
                .populate('_author', 'username')
                .exec(callback);
        });
    }
};

module.exports = publicMethods;