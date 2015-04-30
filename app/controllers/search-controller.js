'use strict';

angular.module('sfMovies').controller('searchController', ['$rootScope', '$scope', 
    function($rootScope, $scope) {

  $scope.selected = function(movie) {
    $rootScope.$emit('movieSelected', movie);
  };
  
}]);