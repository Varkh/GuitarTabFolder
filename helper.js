var dateFormat = require('dateformat');

function getCurentFormatedDate() {
    //TODO get date on client and show wih angular filter | date
    return  dateFormat(new Date(), "dd.mm.yyyy, hh:MM:ss");
}

exports.getCurentFormatedDate = getCurentFormatedDate;