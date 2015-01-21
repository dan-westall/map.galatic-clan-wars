
var mapGCW = angular.module('mapGCW', []);

mapGCW.constant('mapData', solarSystem);

// create angular controller and pass in $scope and $http
mapGCW.controller('mapDisplay', [ '$scope', '$http', 'mapData' ,function($scope, $http, mapData) {
    // create a blank object to hold our form information
    // $scope will allow this to pass between controller and view
    $scope.maps = mapData;

    $scope.getTimes=function(n){
        return new Array(n);
    };

}]);
