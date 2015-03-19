var sideBar = angular.module('sideBar', []);

sideBar.controller('lastTabController', function ($scope, $http) {
    $http.get('/lastTabs')
        .success(function(data) {
            $scope.lastTabs = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});

sideBar.controller('searchController', function ($scope, $http) {
    $scope.searchField = "";
    $scope.search = function() {
        if($scope.searchField) {
            $http.get('/search?queryString=' + $scope.searchField);
        }
    };
});