'use strict';

angular.module('sfMovies').directive('googleMap', ['googleMapLoader', 'mapService', 
  function(googleMapLoader, mapService) {
  
  var getCustomControls = function(el) {
    var customControls = [];
    var children = el.children();

    for (var i = 0; i < children.length; i++) {
      customControls.push(children[i]);
    }

    return customControls;
  };

  return {
    replace: true,
    restrict: 'E',
    link: function($scope, $element) {
      var customControls = getCustomControls($element);

      googleMapLoader.then(function(maps) {       
        $element.html('<div id="map-canvas"></div>');
        mapService.initialize(maps, $element[0].children[0]);
        customControls.forEach(function(c) {
          mapService.addControl(c, c.getAttribute('data-position'));
        });
      });
    }
  };
}]);