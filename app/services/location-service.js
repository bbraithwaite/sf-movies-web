'use strict';

angular.module('sfMovies')
  .service('locationService', ['$window', '$q', '$http', function($window, $q, $http) {
  return {
    getLocations: function(movie) {
      var deferred = $q.defer();
      var url = '/movies/locations?title=' +
        encodeURIComponent(movie.title) + 
        '&director=' + 
        encodeURIComponent(movie.director);

      $http.get(url).
        success(function(data) {
          deferred.resolve(data);
        }).
        error(function() {
          deferred.reject('error fetching locations');
        });

      return deferred.promise;
    }
  };
}]);