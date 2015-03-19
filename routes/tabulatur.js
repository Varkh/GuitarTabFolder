var express = require('express');
var router = express.Router();

var dataWorker = require('../dataWorker');
var helper = require('../helper');

router.route('/:name')
    .all(function(request, response, next) {
        request.tabName = request.params.name.toLowerCase();
        next();
    })
    .get(function(request, response, next) {
        var data = dataWorker.getTab(request.tabName);
        if(!data) {
            response.status(404).json("not found");
        } else {
            response.render('tabPage', { tabData: data });
        }
    });

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

    response.redirect(301, "/tab/"+tabId);
});

router.post('/:name/comment', function(request, response, next) {
    var tabId = request.params.name.toLowerCase()
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