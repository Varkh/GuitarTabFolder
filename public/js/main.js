function showExeption(data) {
    //TODO
    alert(data);
}

var errorResponse = function(data, status, headers, config) {
    showExeption(data);
};

angular.module('tabApplication', ['ui.bootstrap', 'ngTable'])
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
        $http.post('/api/login', $scope.loginData)
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
})
.controller('RegistrationFormController', function ($scope, $http, $window) {
    $scope.isLogined = false;
    $scope.registrationData = {};
    $scope.failureRegistrationMessage = null;

    $scope.submitRegistrationForm = function() {
        $scope.failureLoginMessage = null;
        $http.post('/api/register', $scope.registrationData)
            .success(function(data, status, headers, config) {
                if(status == 201) {
                    $scope.isLogined = true;
                    $window.location.href = '/';
                } else {
                    if(data.err) {
                        $scope.failureRegistrationMessage = data.err;
                    } else {
                        showExeption(data);
                    }
                }
            })
            .error(function(data, status, headers, config) {
                if(data.err) {
                    $scope.failureRegistrationMessage = data.err;
                } else {
                    showExeption(data);
                }
            });
    };
})
.directive('checkPassMatch', [function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            passwordOne: '@'
        },
        link: function(scope, elem, attr, ngModel) {
            ngModel.$parsers.unshift(function (value) {
                ngModel.$setValidity('checkPassMatch', value === scope.passwordOne);
                return value;
            });
        }
    }
}])
.controller('DeleteTabController', function ($scope, $http, $window) {
    var tabName = tabId;

    $scope.deleteClick = function() {
        $http.delete('/api/tab/' + tabName)
            .success(function(data, status) {
                $window.location.href = '/';
            })
            .error(errorResponse);
    }
})
.controller('TabListController', function ($scope, $http, $window, ngTableParams) {
    var tabHeaders = [];
    $http.get('/api/tab')
        .success(function(data) {
            tabHeaders = data;

            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10           // count per page
            }, {
                total: tabHeaders.length, // length of data
                getData: function ($defer, params) {
                    $defer.resolve(tabHeaders.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            })
        })
        .error(errorResponse);
});
