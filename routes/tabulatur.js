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

module.exports = router;