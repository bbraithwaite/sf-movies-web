'use strict';

var map;

window.initialize = function() {
  var mapDiv = document.getElementById('map-canvas');
  map = new window.MapService(window.google, mapDiv);

  var searchControlDiv = document.createElement('div');
  searchControlDiv.id = 'top';
  searchControlDiv.className = 'top';

  new window.SearchControl(searchControlDiv);
  map.addView(searchControlDiv, 'TOP_LEFT');

  var homeControlDiv = document.createElement('div');
  homeControlDiv.id = 'bottom_panel';
  homeControlDiv.className = 'bottom_panel';

  new window.HomeControl(homeControlDiv);
  map.addView(homeControlDiv, 'BOTTOM_CENTER');
};
