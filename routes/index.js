var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {
  //res.render('index', { title: 'Express' });
    response.redirect(301, './pages/about.html');
});

module.exports = router;