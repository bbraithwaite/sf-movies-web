'use strict';

(function (window) {

  window.movieApp = window.movieApp || {};
  window.movieApp.SearchControl = function(controlDiv, map) {
    var detailControl = new window.movieApp.DetailControl(map);
    new window.Autocomplete(controlDiv.searchInput, { 
      url: '/movies/search', 
      param: 'q',
      label: 'title',
      value: 'releaseYear',
      select: function(item) { 
        detailControl(item);
      }
    });

    map.addView(controlDiv.container, 'TOP_LEFT');
  };
})(window);