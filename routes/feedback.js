var express = require('express');
var router = express.Router();

var dataWorker = require('../modules/dataWorker');
var renderer = require('../modules/renderer');

router.get('/', function(request, response) {
    renderer.renderFeedBackPage(response);
});

router.post('/', function(request, response) {
    var newFeedback = request.body;
    dataWorker.addFeedback(
        newFeedback.text,
        (newFeedback.name) ? newFeedback.name : null,
        (newFeedback.email) ? newFeedback.email : null
    );
    response.sendStatus(200);
});

module.exports = router;