var tabData = require("./data");

function getTab(tabId) {
    return tabData[tabId];
}

function getTabs() {
    return tabData;
}

function addTab(tabId, title, postedDate, band, otherInfo, body) {
    tabData[tabId] = {
        tabId: tabId,
        title: title,
        postedDate: postedDate,
        band: band,
        otherInfo: otherInfo,
        body: body
    };
}

function addComment(tabId, author, date, text) {
    var comment = {
        title: author,
        postedDate: date,
        text: text
    };
    if(tabData[tabId].comments) {
        tabData[tabId].comments.push(comment);
    } else {
        tabData[tabId].comments = [comment];
    }
}

exports.getTab = getTab;
exports.getTabs = getTabs;
exports.addTab = addTab;
exports.addComment = addComment;