'use strict';

var app = angular.module('tabPage', []);

app.controller('TabulaturController', [ '$scope', '$http', function($scope, $http) {
    $http.get("/tabContent?id=1")
        .success(function (response) {
            $scope.tabInfo = response;
        });
}]);