var crypto = require('crypto');

var publicMethods = {
    getCurentFormatedDate: function() {
        //TODO get date on client and show wih angular filter | date
        return new Date();
    },

    generateUrlFromName: function(name) {
        var preName = name.split(' ').join('_').toLowerCase();
        return encodeURIComponent(preName);
    },

    getHash: function(initString) {
        return crypto.createHash('sha256').update(initString).digest('hex');
    },
    wrapJsonError: function(response, error, status) {
        if(!status) status = 500;
        response.status(status).send(error);
    }
};

module.exports = publicMethods;