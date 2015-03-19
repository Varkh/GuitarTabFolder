var sideBar = angular.module('sideBar', []);

sideBar.controller('lastTabController', function ($scope, $http) {
    $http.get('/lastTabs')
        .success(function(data) {
            $scope.lastTabs = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});