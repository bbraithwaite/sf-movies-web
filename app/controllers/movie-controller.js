'use strict';

angular.module('sfMovies').controller('movieController', ['$rootScope', '$scope', '$http', 'mapService', 'omdbService', 
    function($rootScope, $scope, $http, mapService, omdbService) {
  
  $rootScope.$on('movieSelected', function(event, movie) {

    mapService.setOptions({ streetViewControl: false, zoomControl: true });
    mapService.clearMarkers();

    $scope.movie = movie;
    $scope.showMovie = true;

    omdbService.getContent(movie)
      .then(function(content) {
        angular.extend($scope.movie, content);
      }, function() {
        //TODO: decide on error display
        console.log('error');
      });

    $http.get('/movies/locations?title=' +
        encodeURIComponent(movie.title) + 
        '&director=' + 
        encodeURIComponent(movie.director)).
      success(function(data) {
        data.locations.forEach(function(l) {
          mapService.plotLocation(l.geo.lat, l.geo.lng, function() {
            $rootScope.$emit('locationSelected', l);
          });
        });
      }).
      error(function(data) {
        //TODO: decide on error display
        console.log(data);
      });
      
  });
}]);