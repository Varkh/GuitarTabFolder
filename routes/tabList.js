var express = require('express');
var router = express.Router();

var dataWorker = require('../dataWorker');
var renderer = require('../modules/renderer');

/* GET list page. */
router.get('/', function(request, response) {
    renderer.renderListPage(response, dataWorker.getTabs());
});

module.exports = router;