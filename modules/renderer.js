var fs = require('fs');
var jade = require('jade');

var pageText;

function initRenderer() {
    pageText = JSON.parse(fs.readFileSync('./locale/ua.json', 'utf8'));
}

function renderTabPage(response, data) {
    response.render('tabPage', { tabData: data, pageText: pageText });
}

function renderAddTabPage(response) {
    response.render('addTab', { pageText: pageText });
}

function renderListPage(response, data) {
    response.render('listPage', { tabsData: data, pageText: pageText  });
}

function renderAboutPage(response) {
    response.render('aboutPage', { pageText: pageText });
}

initRenderer();

exports.initRenderer = initRenderer;
exports.renderTabPage = renderTabPage;
exports.renderAddTabPage = renderAddTabPage;
exports.renderListPage = renderListPage;
exports.renderAboutPage = renderAboutPage;