
function getCurentFormatedDate() {
    //TODO get date on client and show wih angular filter | date
    return new Date();
}

function generateUrlFromName(name) {
    return name.split(' ').join('_').toLowerCase();//TODO find better way
}

exports.getCurentFormatedDate = getCurentFormatedDate;
exports.generateUrlFromName = generateUrlFromName;