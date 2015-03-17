var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next) {
  //res.render('index', { title: 'Express' });
    response.redirect(301, './pages/about.html');
});

module.exports = router;
/*
 app.use(express.static('public'));

 app.get('/getTabList', function(request, response) {
 var blocks = ['aaa', 'bbb', 'ccc'];
 response.json(blocks);
 });

 app.get('/tabContent', function(request, response) {
 response.json(tabs[request.query.id]);
 });
 */