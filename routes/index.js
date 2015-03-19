var express = require('express');
var router = express.Router();

var dataWorker = require('../dataWorker');

/* GET home page. */
router.get('/', function(request, response) {
    response.redirect(301, './pages/about.html');
});

router.get('/lastTabs', function(request, response, next) {
    response.json(dataWorker.getLastTabNames());
});

module.exports = router;