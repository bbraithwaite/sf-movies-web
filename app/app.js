var map;

function initialize() {
  var mapDiv = document.getElementById('map-canvas');
  map = new MapService(window.google, mapDiv);

  var searchControlDiv = document.createElement('div');
  searchControlDiv.id = 'top';
  searchControlDiv.className = 'top';

  new SearchControl(searchControlDiv);
  map.addView(searchControlDiv, 'TOP_LEFT');

  var homeControlDiv = document.createElement('div');
  homeControlDiv.id = 'bottom_panel';
  homeControlDiv.className = 'bottom_panel';

  new HomeControl(homeControlDiv);
  map.addView(homeControlDiv, 'BOTTOM_CENTER');
}
