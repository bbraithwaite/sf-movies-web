'use strict';

angular.module('sfMovies').controller('locationController', ['$rootScope', '$scope', 'mapService', 
    function($rootScope, $scope, mapService) {

  $rootScope.$on('locationSelected', function(event, location) {
    mapService.zoomView(location.geo.lat, location.geo.lng);

    $scope.$apply(function() {
      $scope.location = location;
      $scope.$parent.showMovie = false;
      $scope.showLocation = true;
    });

  });

  $scope.backToMovie = function() {
    mapService.reset();
    $scope.$parent.showMovie = true;
    $scope.showLocation = false;
  };

  $scope.roadmapView = function() {
    mapService.roadmapView($scope.location.geo.lat, $scope.location.geo.lng);
    $scope.isSateliteView = false;
  };

  $scope.sateliteView = function() {
    mapService.sateliteView($scope.location.geo.lat, $scope.location.geo.lng);
    $scope.isSateliteView = true;
  };

  $scope.streetView = function() {
    mapService.streetView($scope.location.geo.lat, $scope.location.geo.lng);
  };
  
}]);