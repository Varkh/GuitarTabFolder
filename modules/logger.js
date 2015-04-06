var log4js = require('log4js');
var config = require('../modules/config');

log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: config.getLogFilePath(), category: 'main' }
    ]
});

var logger = log4js.getLogger('main');
logger.setLevel(config.getLogLevel());

logger.info("Logger initialized. Level: " + config.getLogLevel());

module.exports = logger;