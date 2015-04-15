//TODO read from file
var fs = require('fs');

var configFileURL = '../config.json';
var data = function() {
    return JSON.parse(fs.readFileSync(fileURL, 'utf8'));
};

function getDbUrl() {
    return 'mongodb://localhost/test';
}

function getLogLevel() {
    return 'DEBUG';
}

function getLogFilePath() {
    return './log.txt';
}

function getSessionSecret() {
    return 'secret';
}

exports.getDbUrl = getDbUrl;
exports.getLogLevel = getLogLevel;
exports.getLogFilePath = getLogFilePath;
exports.getSessionSecret = getSessionSecret;