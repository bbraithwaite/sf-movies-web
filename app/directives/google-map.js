'use strict';

angular.module('sfMovies').directive('googleMap', ['googleMapLoader', 'mapService', 
  function(googleMapLoader, mapService) {
  return {
    replace: true,
    restrict: 'E',
    link: function($scope, $element) {
      var mapControls = [];
      var children = $element.children();
      for (var i = 0; i < children.length; i++) {
        mapControls.push(children[i]);
      }
      
      googleMapLoader.then(function(maps) {       
        $element.html('<div id="map-canvas"></div>');
        mapService.initialize(maps, $element[0].children[0]);
        mapControls.forEach(function(c) {
          mapService.addControl(c, c.getAttribute('data-position'));
        });
      });
    }
  };
}]);