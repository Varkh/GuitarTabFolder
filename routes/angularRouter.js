var express = require('express');
var router = express.Router();

var renderer = require('../modules/renderer');

module.exports = router;

router.get('/templates/comments', function(request, response) {
    renderer.renderCommentsTemplate(request, response);
})
.get('/templates/errorMessage', function(request, response) {
    renderer.renderErrorMessageTemplate(request, response);
})