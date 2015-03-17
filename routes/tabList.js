var express = require('express');
var router = express.Router();

var tabData = require("./../data");

/* GET list page. */
router.get('/', function(request, response, next) {
    response.render('listPage', { tabsData: tabData });
});

module.exports = router;