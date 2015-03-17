var express = require('express');
var router = express.Router();

/* GET list page. */
router.get('/', function(request, response, next) {
    //res.render('index', { title: 'Express' });
    response.redirect(301, './pages/tabPage.html');
});

module.exports = router;