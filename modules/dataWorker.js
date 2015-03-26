var fs = require('fs');

var tabData;
var fileURL = './data.json';
function loadDataFile() {
    var data = JSON.parse(fs.readFileSync(fileURL, 'utf8'));
    tabData = data.tabs;
}

function saveDataFile() {
    fs.writeFile(fileURL, JSON.stringify(tabData), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
}

function getTab(tabId) {
    return tabData[tabId];
}

function getTabs() {
    return tabData;
}

function getLastTabNames() {
    //TODO get last tabs
    var tabList = tabData;
    var result = [];
    for (var tab in tabList) {
        if (tabList.hasOwnProperty(tab)) {
            result.push({
                tabId: tabList[tab].tabId,
                title: tabList[tab].title
            });
        }
    }
    return result;
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
    saveDataFile();
}

function searchForTab(query) {
    //search by id and title
    var q = query.toLowerCase();
    var tabById = getTab(q);
    if(tabById) {
        return tabById.tabId;
    } else {
        for (var tab in tabData) {
            if (tabData.hasOwnProperty(tab)) {
                console.log(tabData[tab].title.toLowerCase() + ' == ' +q);
                if (tabData[tab].title.toLowerCase() == q) {
                    return tabData[tab].tabId;
                }
            }
        }
        return null;
    }
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
    saveDataFile();
}

function addFeedback(text, name, email) {
    var feedback = {text: text};
    if(name) feedback.name = name;
    if(email) feedback.email = email;
    //TODO save
    console.log(feedback);
}

loadDataFile();

exports.getTab = getTab;
exports.getTabs = getTabs;
exports.addTab = addTab;
exports.addComment = addComment;
exports.getLastTabNames = getLastTabNames;
exports.searchForTab = searchForTab;
exports.addFeedback = addFeedback;