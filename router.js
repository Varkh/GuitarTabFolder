var express = require('express');

module.exports = function(app) {
    app.use(express.static('public'));

    app.get('/', function(request, response) {
        response.redirect(301, './pages/about.html');
    });

    app.get('/getTabList', function(request, response) {
        var blocks = ['aaa', 'bbb', 'ccc'];
        response.json(blocks);
    });
};