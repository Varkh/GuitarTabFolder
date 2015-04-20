var express = require('express');
var router = express.Router();

var tabRequestHandler = require('../../handlers/tabRequestHandler');
var authenticator = require('../../modules/authenticator')
var helper = require('../../modules/helper');

router.param('name', function(request, response, next) {
    request.tabName = request.params.name.toLowerCase();
    next();
})
.get('/:name/comment', function(request, response, next) {
        tabRequestHandler.getTabComments(request.tabName, function (err, comments) {
            if(err) {
                helper.wrapJsonError(response, err);
                return;
            }
            response.json(comments ? comments : []);
        });
})
.post('/:name/comment', authenticator.isLoggedIn, function(request, response, next) {
    var tabId = request.params.name.toLowerCase();
    var newComment = request.body;
    tabRequestHandler.addComment(
        tabId,
        request.user.username,
        helper.getCurentFormatedDate(),
        newComment.text,
        function (err, comment) {
            if(err) {
                helper.wrapJsonError(response, err);
                return;
            }
            response.status(201).json(comment);
        }
    );
});

module.exports = router;