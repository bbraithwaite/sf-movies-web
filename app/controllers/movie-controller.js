'use strict';

angular.module('sfMovies')
  .controller('movieController', ['$rootScope', '$scope', 'mapService', 'omdbService', 'locationService',
    function($rootScope, $scope, mapService, omdbService, locationService) {
  
  $rootScope.$on('movieSelected', function(event, movie) {

    mapService.setOptions({ streetViewControl: false, zoomControl: true });
    mapService.clearMarkers();

    $scope.movie = movie;
    $scope.showMovie = true;

    omdbService.getContent(movie)
      .then(function(content) {
        angular.extend($scope.movie, content);
      }, function() {
        //TODO: decide on error display strategy
        console.log('error');
      });
  
    locationService.getLocations(movie)
      .then(function(data) {
        data.locations.forEach(function(l) {
          mapService.plotLocation(l.geo.lat, l.geo.lng, function() {
            $rootScope.$emit('locationSelected', l);
          });
        });
      }, function() {
        //TODO: decide on error display strategy
        console.log('error');
      });

  });

}]);