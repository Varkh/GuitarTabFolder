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

function renderEditTabPage(response, data) {
    response.render('addTab', { tabData: data, pageText: pageText });
}

function renderListPage(response, data) {
    response.render('listPage', { tabsData: data, pageText: pageText  });
}

function renderAboutPage(response) {
    response.render('aboutPage', { pageText: pageText });
}

function renderFeedBackPage(response) {
    response.render('feedbackPage', { pageText: pageText  });
}

function renderLoginPage(response) {
    response.render('loginPage', { pageText: pageText  });
}

function renderer404Page(response, error) {
    response.render('error', {
        message: '404 ' + pageText.errorMessages.text404,
        error: {},
        pageText: pageText
    });
}

function renderErrorPage(response, error) {
    if(error.status == 404) {
        renderer404Page(response, error);
        return;
    }

    response.status(error.status || 500);
    response.render('error', {
        message: error.message,
        error: error,
        pageText: pageText
    });
}

initRenderer();

exports.initRenderer = initRenderer;
exports.renderTabPage = renderTabPage;
exports.renderAddTabPage = renderAddTabPage;
exports.renderEditTabPage = renderEditTabPage;
exports.renderListPage = renderListPage;
exports.renderAboutPage = renderAboutPage;
exports.renderFeedBackPage = renderFeedBackPage;
exports.renderLoginPage = renderLoginPage;
exports.renderer404Page = renderer404Page;
exports.renderErrorPage = renderErrorPage;