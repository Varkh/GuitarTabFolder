var dateFormat = require('dateformat');

function getCurentFormatedDate() {
    return  dateFormat(new Date(), "dd.mm.yyyy, hh:MM:ss");
}

exports.getCurentFormatedDate = getCurentFormatedDate;