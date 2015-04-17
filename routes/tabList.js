var express = require('express');
var router = express.Router();

var tabRequestHandler = require('../handlers/tabRequestHandler');
var renderer = require('../modules/renderer');

//TODO rewrite according to REST
/* GET list page. */
router.get('/', function(request, response, next) {
    tabRequestHandler.getTabs(function (err, tabs) {
        if(err) {
            next(err);
            return;
        }
        renderer.renderListPage(request, response, tabs);
    });
});

module.exports = router;