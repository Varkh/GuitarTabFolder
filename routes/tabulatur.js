var express = require('express');
var router = express.Router();

var tabRequestHandler = require('../handlers/tabRequestHandler');
var helper = require('../modules/helper');
var renderer = require('../modules/renderer');
var logger = require('../modules/logger');
var authenticator = require('../modules/authenticator');
//TODO move to api

router.param('name', function(request, response, next) {
    request.tabName = encodeURIComponent(request.params.name.toLowerCase());
    next();
});

router.get('/:name', function(request, response, next) {
    tabRequestHandler.getTab(request.tabName, function (err, tab) {
        if(err) {
            next(err);
            return;
        }
        if(tab) {
            tab.isOwner = authenticator.isOwner(request, tab._author._id);
            renderer.renderTabPage(request, response, tab);
        } else {
            var err404 = new Error('');
            err404.status = 404;
            next(err404);
        }
    });

});

router.get('/', authenticator.isLoggedIn, function(request, response) {
    renderer.renderAddTabPage(request, response);
});

router.get('/:name/edit', function(request, response, next) {
    tabRequestHandler.getTab(request.tabName, function (err, tab) {
        if(!authenticator.isOwner(request, tab._author._id)) {
            helper.wrapJsonError(response, 403, "Forbidden");
            return;
        }
        if(err) {
            next(err);
            return;
        }
        if(!tab) {
            var err404 = new Error('');
            err404.status = 404;
            next(err404);
        } else {
            var dataToSend = {
                tabId: tab.tabId,
                title: tab.title,
                band: tab.band,
                info: tab.otherInfo.join('\n'),
                body: tab.body.join('\n')
            };
            renderer.renderEditTabPage(request, response, dataToSend);
        }
    });
});

module.exports = router;