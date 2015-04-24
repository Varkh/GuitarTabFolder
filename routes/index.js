var express = require('express');
var router = express.Router();

var tabRequestHandler = require('../handlers/tabRequestHandler');
var indexRequestHandler = require('../handlers/indexRequestHandler');
var renderer = require('../modules/renderer');

/* GET home page. */
router.get('/', function(request, response) {
    response.redirect(301, './about');
});

/* GET pages*/

router.get('/about', function(request, response) {
    renderer.renderAboutPage(request, response);
});

/* API */
router.get('/lastTabs', function(request, response) {
    tabRequestHandler.getLastTabNames(function (err, tab) {
        if(err) {
            next(err);
            return;
        }
        response.json(tab);
    });

});

router.get('/search', function(request, response) {
    indexRequestHandler.searchForTab(request.query.queryString, function (err, results) {
        if(err) {
            next(err);
            return;
        }
        if(results.length > 0) {
            response.json({url: '/tab/' + results[0].tabId});
        } else {
            response.json("");
        }
    });
});

router.get('/login', function(request, response) {
    renderer.renderLoginPage(request, response);
});

router.get('/logout', function(request, response) {
    request.logout();
    response.redirect('/');
});

module.exports = router;