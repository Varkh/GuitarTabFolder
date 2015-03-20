var express = require('express');
var router = express.Router();

var dataWorker = require('../dataWorker');

/* GET home page. */
router.get('/', function(request, response) {
    response.redirect(301, './pages/about.html');
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