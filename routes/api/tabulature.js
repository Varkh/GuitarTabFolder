var express = require('express');
var router = express.Router();

var tabRequestHandler = require('../../handlers/tabRequestHandler');
var authenticator = require('../../modules/authenticator');
var helper = require('../../modules/helper');
var logger = require('../../modules/logger');

router.param('name', function(request, response, next) {
    request.tabName = encodeURIComponent(request.params.name.toLowerCase());
    next();
})
.post('/', authenticator.isLoggedIn, function(request, response, next) {
    var tabData = request.body;
    tabData.username = request.user.username;
    tabRequestHandler.addTab(tabData, function (err, tab) {
        if(err) {
            helper.wrapJsonError(response, err);
            return;
        }
        logger.debug("New tab created: " + tab.tabId);
        response.json({url: '/tab/' + tab.tabId});
    });
})
.put('/:name/', authenticator.isOwner, function(request, response, next) {
    tabRequestHandler.editTab(request.tabName, request.body, function (err, tab) {
        if(err) {
            helper.wrapJsonError(response, err);
            return;
        }
        response.json({url: '/tab/' + tab.tabId});
    });
})
.delete('/:name', function(request, response, next) {
    tabRequestHandler.deleteTab(request, function(err) {
        if(!err) {
            response.sendStatus(200);
        } else {
            helper.wrapJsonError(response, err.error ? err.error : "", err.status ? err.status : null);
        }
    });
})
.get('/:name/comment', function(request, response, next) {
    tabRequestHandler.getTabComments(request.tabName, function (err, comments) {
        if(err) {
            helper.wrapJsonError(response, err);
            return;
        }
        response.json(comments ? comments : []);
    });
})
.post('/:name/comment', authenticator.isLoggedIn, function(request, response, next) {
    var tabId = request.tabName;
    var newComment = request.body;
    tabRequestHandler.addComment(
        tabId,
        request.user.username,
        helper.getCurentFormatedDate(),
        newComment.text,
        function (err, comment) {
            if(err) {
                helper.wrapJsonError(response, err);
                return;
            }
            response.status(201).json(comment);
        }
    );
})
.get('/', function(request, response, next) {
    tabRequestHandler.getTabs(function (err, tabs) {//TODO: get tab header, not the whole tab
        if(err) {
            helper.wrapJsonError(response, err);
            return;
        }
        response.status(201).json(tabs);
    });
});

module.exports = router;