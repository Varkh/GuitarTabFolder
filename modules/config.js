var fs = require('fs');

var configFileURL = '../config.json';
var data = function() {
    return JSON.parse(fs.readFileSync(fileURL, 'utf8'));
};

function getDbUrl() {
    return 'mongodb://localhost/test';//TODO read from file
}

exports.getDbUrl = getDbUrl;