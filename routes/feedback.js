var express = require('express');
var router = express.Router();

var indexRequestHandler = require('../handlers/indexRequestHandler');
var renderer = require('../modules/renderer');

router.get('/', function(request, response) {
    renderer.renderFeedBackPage(response);
});

router.post('/', function(request, response) {
    var newFeedback = request.body;
    indexRequestHandler.addFeedback(
        newFeedback.text,
        (newFeedback.name) ? newFeedback.name : null,
        (newFeedback.email) ? newFeedback.email : null,
        function (err, tab) {
            if(err) {
                next(err);
                return;
            }
            console.log("feedback added");
            response.sendStatus(200);
        }
    );
});

module.exports = router;