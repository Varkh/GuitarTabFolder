var express = require('express');
var router = express.Router();

var dataWorker = require('../modules/dataWorker');
var helper = require('../helper');
var renderer = require('../modules/renderer');

router.param('name', function(request, response, next) {
    request.tabName = request.params.name.toLowerCase();
    next();
});

router.get('/:name', function(request, response, next) {
    var data = dataWorker.getTab(request.tabName);
    if(!data) {
        var err = new Error('');
        err.status = 404;
        next(err);
    } else {
        renderer.renderTabPage(response, data);
    }
});

router.get('/', function(request, response) {
    renderer.renderAddTabPage(response);
});

router.get('/:name/edit', function(request, response, next) {
    var data = dataWorker.getTab(request.tabName);
    if(!data) {
        var err = new Error('');
        err.status = 404;
        next(err);
    } else {
        var dataToSend = {
            tabId: data.tabId,
            title: data.title,
            band: data.band,
            info: data.otherInfo.join('\n'),
            body: data.body.join('\n')
        };
        renderer.renderEditTabPage(response, dataToSend);
    }
});

/* API */
router.post('/', function(request, response, next) {
    var newTab = request.body;
    var tabId = newTab.title.split(' ').join('_').toLowerCase();

    dataWorker.addTab(
        tabId,
        newTab.title,
        helper.getCurentFormatedDate(),
        newTab.band,
        newTab.info.split('\n'),
        newTab.body.split('\n')
    );
    response.json({url: '/tab/' + tabId});
});

router.put('/:name/', function(request, response, next) {
    //TODO change to real edit
    var newTab = request.body;
    var tabId = newTab.title.split(' ').join('_').toLowerCase();

    dataWorker.addTab(
        tabId,
        newTab.title,
        helper.getCurentFormatedDate(),
        newTab.band,
        newTab.info.split('\n'),
        newTab.body.split('\n')
    );
    response.json({url: '/tab/' + tabId});
});


router.post('/:name/comment', function(request, response, next) {
    var tabId = request.params.name.toLowerCase();
    var newComment = request.body;
    dataWorker.addComment(
        tabId,
        "Author",
        helper.getCurentFormatedDate(),
        newComment.text
    );
    response.redirect(301, "/tab/"+tabId);
});

module.exports = router;