var express = require('express');
var router = express.Router();

var tabRequestHandler = require('../handlers/tabRequestHandler');
var helper = require('../modules/helper');
var renderer = require('../modules/renderer');
var logger = require('../modules/logger');
var authenticator = require('../modules/authenticator');
//TODO move to api

router.param('name', function(request, response, next) {
    request.tabName = request.params.name.toLowerCase();
    next();
});

router.get('/:name', function(request, response, next) {
    tabRequestHandler.getTab(request.tabName, function (err, tab) {
        if(err) {
            next(err);
            return;
        }
        if(tab) {
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

/* API */
router.post('/', authenticator.isLoggedIn, function(request, response, next) {
    var tabData = request.body;
    tabData.username = request.user.username;
    tabRequestHandler.addTab(tabData, function (err, tab) {
        if(err) {
            next(err);
            return;
        }
        logger.debug("New tab created: " + tab.tabId);
        response.json({url: '/tab/' + tab.tabId});
    });
});

router.put('/:name/', authenticator.isOwner, function(request, response, next) {
    tabRequestHandler.editTab(request.tabName, request.body, function (err, tab) {
        if(err) {
            next(err);
            return;
        }
        response.json({url: '/tab/' + tab.tabId});
    });
});

module.exports = router;