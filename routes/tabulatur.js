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
        title: newTab.title,
        postedDate: new Date(),
        band: newTab.band,
        otherInfo: newTab.info.split('\n'),
        body: newTab.body.split('\n')
    };

    response.status(201).render('tabPage', { tabData: tabData[tabId] });
});

module.exports = router;