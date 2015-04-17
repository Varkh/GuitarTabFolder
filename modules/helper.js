var crypto = require('crypto');

var publicMethods = {
    getCurentFormatedDate: function() {
        //TODO get date on client and show wih angular filter | date
        return new Date();
    },

    generateUrlFromName: function(name) {
        return name.split(' ').join('_').toLowerCase();//TODO find better way
    },

    getHash: function(initString) {
        return crypto.createHash('sha256').update(initString).digest('hex');
    }
};

module.exports = publicMethods;