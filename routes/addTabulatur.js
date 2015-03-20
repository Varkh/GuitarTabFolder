var express = require('express');
var router = express.Router();

var renderer = require('../modules/renderer');

router.get('/', function(request, response) {
    renderer.renderAddTabPage(response);
});

module.exports = router;