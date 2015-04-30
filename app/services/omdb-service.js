'use strict';

angular.module('sfMovies').service('omdbService', ['$window', '$q', function($window, $q) {
  return {
    getContent: function(movie) {
      var deferred = $q.defer();
      $window.omdb.get({
        title: movie.title, 
        year: parseInt(movie.releaseYear, 10) 
      }, function(err, content) {
        if (!err) {
          var movie = {};
          movie.poster = content.Poster;
          movie.plot = content.Plot;
          movie.poster = content.Poster;
          movie.genre = content.Genre;
          movie.actors = content.Actors;
          movie.rating = content.imdbRating;
          deferred.resolve(movie);
        } else {
          deferred.reject('error fetching omdb content');
        }
      });
      return deferred.promise;
    }
  };
}]);