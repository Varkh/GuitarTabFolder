var express = require('express');
var router = express.Router();

/* GET list page. */
router.get('/', function(request, response, next) {
    console.log("list!!!");
    response.render('listPage', { title: 'Express' });
});

module.exports = router;