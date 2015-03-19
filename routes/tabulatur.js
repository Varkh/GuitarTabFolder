var express = require('express');
var router = express.Router();

var tabData = require("./../data");


router.route('/:name')
    .all(function(request, response, next) {
        request.tabName = request.params.name.toLowerCase();
        next();
    })
    .get(function(request, response, next) {
        var data = tabData[request.tabName];
        if(!data) {
            response.status(404).json("not found");
        } else {
            response.render('tabPage', { tabData: tabData['vona'] });
        }
    });

router.post('/', function(request, response, next) {
    var newTab = request.body;
    var tabId = newTab.title.split(' ').join('_');

    //add new tab
    //TODO rewrite
    tabData[tabId] = {
        tabId: tabId,
        title: newTab.title,
        postedDate: new Date(),
        band: newTab.band,
        otherInfo: newTab.info.split('\n'),
        body: newTab.body.split('\n')
    };

    response.status(201).render('tabPage', { tabData: tabData[tabId] });
});

router.post('/:name/comment', function(request, response, next) {
    var tabId = request.params.name.toLowerCase()
    var newComment = request.body;
    var comment = {
        title: "Author",
        postedDate: new Date(),
        text: newComment.text
    };
    tabData[tabId].comments.push(comment);

    response.redirect(301, "/tab/"+tabId);
});

module.exports = router;