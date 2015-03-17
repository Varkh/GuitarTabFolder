var express = require('express');
var router = express.Router();

var tabData = require("./../data");

router.get('/', function(request, response, next) {
    response.render('tabPage', { tabData: tabData['vona'] });
});

module.exports = router;