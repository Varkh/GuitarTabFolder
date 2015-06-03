var fs = require('fs');
var jade = require('jade');

var pageText;

function getPageCommonData(request) {
    var data = { pageText: pageText };
    if(request && request.isAuthenticated()) {
        data.username = request.user.username
    }
    return data;
}

var publicMethods = {
    initRenderer: function() {
        pageText = JSON.parse(fs.readFileSync('./locale/ua.json', 'utf8'));
    },

    renderTabPage: function(request, response, data) {
        var pageData = getPageCommonData(request);
        pageData.tabData = data;
        response.render('tabPage', pageData);
    },

    renderAddTabPage: function(request, response) {
        response.render('addTab', getPageCommonData(request));
    },

    renderEditTabPage: function(request, response, data) {
        var pageData = getPageCommonData(request);
        pageData.tabData = data;
        response.render('addTab', pageData);
    },

    renderListPage: function(request, response, data) {
        var pageData = getPageCommonData(request);
        pageData.tabsData = data;
        response.render('listPage', pageData);
    },

    renderAboutPage: function(request, response) {
        response.render('aboutPage', getPageCommonData(request));
    },

    renderFeedBackPage: function(request, response) {
        response.render('feedbackPage', getPageCommonData(request));
    },

    renderLoginPage: function(request, response) {
        response.render('loginPage', getPageCommonData(request));
    },

    renderer404Page: function(request, response, error) {
        var pageData = getPageCommonData(request);
        pageData.message = '404 ' + pageText.errorMessages.text404;
        pageData.error = {};
        response.render('error', pageData);
    },
    renderCommentsTemplate: function(request, response) {
        response.render('templates/comments', getPageCommonData(request));
    },
    renderErrorMessageTemplate: function(request, response) {
        response.render('templates/errorMessageTemplate');
    },

    renderErrorPage: function(request, response, error) {
        if(error.status == 404) {
            this.renderer404Page(request, response, error);
            return;
        }

        var pageData = getPageCommonData(request);
        pageData.message = error.message;
        pageData.error = error;

        response.status(error.status || 500);
        response.render('error', pageData);
    }
};

publicMethods.initRenderer();

module.exports = publicMethods;