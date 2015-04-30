'use strict';

angular.module('sfMovies').directive('bocAutocomplete', function() {
  // create dynamic id to avoid collisions
  var id = 'autocomplete' + Math.round(Math.random() * 1000);
  return {
    replace: true,
    restrict: 'E',
    template: '<input type="search" id="' + id + '" name="' + id + '">',
    link: function(scope, element, attrs) {
      new window.Autocomplete(element[0], { 
        url: attrs.url, 
        param: attrs.sparam,
        label: attrs.stext,
        value: attrs.svalue,
        select: function(item) {
          scope.selected(item);
        }
      });
    }
  };
});