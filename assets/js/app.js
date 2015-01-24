
var mapGCW = angular.module('mapGCW', []);

mapGCW.constant('mapData', solarSystem);
mapGCW.constant('mapConnections', systemConnections);

// create angular controller and pass in $scope and $http
mapGCW.controller('mapDisplay', [ '$scope', '$http', 'mapData', 'mapConnections' ,function($scope, $http, mapData, mapConnections) {
    // create a blank object to hold our form information
    // $scope will allow this to pass between controller and view
    $scope.maps = mapData;

    $scope.getTimes=function(n){
        return new Array(n);
    };

    //mapConnections.
    //
    //


    //$scope.init = function() {
    //    jsPlumb.bind("ready", function() {
    //        console.log("Set up jsPlumb listeners (should be only done once)");
    //        jsPlumb.bind("connection", function (info) {
    //            $scope.$apply(function () {
    //                console.log("Possibility to push connection into array");
    //            });
    //        });
    //    });
    //}
    $scope.init = function() {

        jsPlumb.bind("ready", function () {

            _(mapConnections).forEach(function(connection) {

                jsPlumb.connect({
                    source: connection.from,
                    target: connection.to,
                    paintStyle: {
                        strokeStyle: "rgba(255,255,255,0.4)",
                        fillStyle: "transparent",
                        radius: 7,
                        lineWidth: 1
                    },
                    anchors: ["Center", "Center"],
                    endpoint: "Blank",
                    endpointStyle: {fillStyle: "yellow"},
                    connector: [ "Straight", { gap: [20, 20] } ]
                });

            });

        });
    }

}]);
