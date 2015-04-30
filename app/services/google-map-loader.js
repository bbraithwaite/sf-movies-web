'use strict';

angular.module('sfMovies').service('googleMapLoader', ['$window', '$document', '$q', function($window, $document, $q) {
  var isLoaded = function() {
    return angular.isDefined($window.google) && 
      angular.isDefined($window.google.maps);
  };

  var deferred = $q.defer();

  var addGoogleScript = function() {
    var tempInitFunctionName = 'initialize' + Math.round(Math.random() * 1000);

    $window[tempInitFunctionName] = function() {
      $window[tempInitFunctionName] = null;
      deferred.resolve(window.google.maps);
    };

    var script = $document[0].createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?callback=' + 
      tempInitFunctionName;
    return $document[0].body.appendChild(script);
  };

  if (isLoaded()) {
    deferred.resolve(window.google.maps);
  } else {
    addGoogleScript();
  }

  return deferred.promise;
}]);