//-external
var express = require('express');
//-imports
var router = require('./router');
//-global values
var port = 8000;

var app = express();
router(app);

app.listen(port, function() {
    console.log("Listening on port " + port);
});

