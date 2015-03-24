var express = require('express');
var router = express.Router();

var dataWorker = require('../modules/dataWorker');
var renderer = require('../modules/renderer');

/* GET home page. */
router.get('/', function(request, response) {
    response.redirect(301, './about');
});

/* GET pages*/

router.get('/about', function(request, response) {
    renderer.renderAboutPage(response);
});

/* API */
router.get('/lastTabs', function(request, response) {
    response.json(dataWorker.getLastTabNames());
});

router.get('/search', function(request, response) {
    var result  = dataWorker.searchForTab(request.query.queryString);
    if(result) {
        response.json({url: '/tab/' + result});
    } else {
        response.json("");
    }
});

module.exports = router;