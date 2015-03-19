var express = require('express');
var router = express.Router();

var dataWorker = require('../dataWorker');

/* GET list page. */
router.get('/', function(request, response, next) {
    response.render('listPage', { tabsData: dataWorker.getTabs() });
});

module.exports = router;