function showExeption(data) {
    //TODO
    alert(data);
}

var errorResponse = function(data, status, headers, config) {
    showExeption(data);
};

angular.module('tabApplication', ['ui.bootstrap'])
.controller('lastTabController', function ($scope, $http) {
    $http.get('/lastTabs')
        .success(function(data) {
            $scope.lastTabs = data;
        })
        .error(errorResponse);
})
.controller('searchController', function ($scope, $http, $window) {
    $scope.showAlert = false;
    $scope.searchField = "";
    $scope.search = function() {
        $scope.showAlert = false;
        if($scope.searchField) {
            $http.get('/search?queryString=' + $scope.searchField)
                .success(function(data) {
                    if (data) {
                        $window.location.href = data.url;
                    } else {
                        $scope.showAlert = true;
                    }
                });
        }
    };
    $scope.searchKeyPress = function(keyEvent) {
        if (keyEvent.which === 13)
            $scope.search();
    }
})
.controller('TabFormController', function ($scope, $http, $window) {
    var isEdit = typeof tabDataClient != 'undefined';
    if(isEdit) {
        $scope.tab = tabDataClient;
    }

    $scope.submitTabForm = function() {
        var successResponse = function(data, status, headers, config) {
            if (data && data.url) {
                $window.location.href = data.url;
            } else {
                showExeption(data);
            }
        };
        if(isEdit) {
            $http.put('/tab/' + tabDataClient.tabId, $scope.tab)
                .success(successResponse)
                .error(errorResponse);
        } else {
            $http.post('/tab', $scope.tab)
                .success(successResponse)
                .error(errorResponse);
        }
    }
})
.controller('FeedbackFormController', function ($scope, $http) {
    $scope.isSubmited = false;
    $scope.feedbackMsg = {};

    $scope.submitFeedBackForm = function() {
        $http.post('/feedback', $scope.feedbackMsg)
            .success(function(data, status, headers, config) {
                if(status == 200) {
                    $scope.isSubmited = true;
                } else {
                    showExeption();
                }
            })
            .error(errorResponse);
    };
})
.controller('LoginFormController', function ($scope, $http, $window) {
    $scope.isLogined = false;
    $scope.loginData = {};
    $scope.failureLoginMessage = null;

    $scope.submitLoginForm = function() {
        $scope.failureLoginMessage = null;
        $http.post('/login', $scope.loginData)
            .success(function(data, status, headers, config) {
                if(status == 200) {
                    $scope.isLogined = true;
                    $window.location.href = '/';
                } else {
                    if(data.message) {
                        $scope.failureLoginMessage = data.message;
                    } else {
                        showExeption(data);
                    }
                }
            })
            .error(function(data, status, headers, config) {
                if(data.message) {
                    $scope.failureLoginMessage = data.message;
                } else {
                    showExeption(data);
                }
            });
    };
})
.directive('comments', function () {
    return {
        restrict: 'E',
        templateUrl: '/angular/templates/comments',
        controller: function($scope, $http) {
            $scope.comments = [];
            $scope.newComment = {};

            var tabName = tabId;//TODO find another way to get tabId
            $http.get('/api/tab/' + tabName + '/comment')
                .success(function(data) {
                    $scope.comments = data;
                })
                .error(errorResponse);

            $scope.submitCommentForm = function() {
                $http.post('/api/tab/' + tabName + '/comment', $scope.newComment)
                    .success(function(data, status, headers, config) {
                        if(data.text) {
                        $scope.comments.push(data)
                        } else {
                            showExeption(data);
                        }
                        $scope.newComment = {};
                        $scope.commentForm.$setPristine();
                    })
                    .error(errorResponse);
            }
        }
    };
});