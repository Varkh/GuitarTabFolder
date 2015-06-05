var configData = {
    dbName: "test",
    dbLocation: "mongodb://localhost/",
    logLevel: "DEBUG",
    logFile: "./log.txt",
    sessionSecret: "secret"
};

function getDbName() {
    return configData.dbName;
}

var publicMethods = {
    getDbUrl: function() {
        return configData.dbLocation + getDbName();
    },
    getLogLevel: function() {
        return configData.logLevel;
    },
    getLogFilePath: function() {
        return configData.logFile;
    },
    getSessionSecret: function() {
        return configData.sessionSecret;
    }
};

module.exports = publicMethods;