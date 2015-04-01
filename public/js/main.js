//TODO rename or restuct module
var sideBar = angular.module('sideBar', ['ui.bootstrap']);

function showExeption(data) {
    //TODO
    alert("Something goes wrong");
}

sideBar.controller('lastTabController', function ($scope, $http) {
    $http.get('/lastTabs')
        .success(function(data) {
            $scope.lastTabs = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});

sideBar.controller('searchController', function ($scope, $http, $window) {
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
});

sideBar.controller('TabFormController', function ($scope, $http, $window) {
    var isEdit = typeof tabDataClient != 'undefined';
    if(isEdit) {
        $scope.tab = tabDataClient;
    }

    $scope.submitTabForm = function() {
        var successResponse = function(data, status, headers, config) {
            if (data && data.url) {
                $window.location.href = data.url;
            } else {
                showExeption();
            }
        };
        var errorResponse = function(data, status, headers, config) {
            showExeption();
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
});

sideBar.controller('FeedbackFormController', function ($scope, $http) {
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
            .error(function(data, status, headers, config) {
                showExeption(data);
            });
    };
});