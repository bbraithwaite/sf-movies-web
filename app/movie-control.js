'use strict';

var plotLocations = function(item) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var response = this.response;
    for (var i = 0; i < response.locations.length; i++) {
      window.map.plotLocation(
        response.locations[i].geo.lat, 
        response.locations[i].geo.lng, 
        window.showLocation(response, response.locations[i]));
    }
  };
  xhr.open('GET', '/movies/locations?title=' + 
    encodeURIComponent(item.title) + 
    '&director=' + 
    encodeURIComponent(item.director));
  xhr.responseType = 'json';
  xhr.send();
};

var displayLoadingPanel = function(response) {
  var locationDiv = document.getElementById('location_detail');
  if (locationDiv) {
    locationDiv.style.display = 'none';
  }

  var dashboard = document.getElementById('dashboard');
  if (dashboard) {
    dashboard.style.display = 'none';
  }
  
  var controlText;

  if (!document.getElementById('film_detail')) {

    controlText = document.createElement('div');
    controlText.id = 'film_detail';
    controlText.className = 'film_detail';
    controlText.innerHTML = window.templates.loading(response);

    document.getElementById('bottom_panel').appendChild(controlText);

  } else {

    controlText = document.getElementById('film_detail');
    controlText.innerHTML = window.templates.loading(response);
    controlText.style.display = '';

  }
};

var getMoveDetail = function(title, director) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var detail = this.response;
    var template = window.templates.movie(detail);
    document.getElementById('film_detail').innerHTML = template;
  };
  xhr.open('GET', '/movies/content?title=' + 
    encodeURIComponent(title) + 
    '&director=' + 
    encodeURIComponent(director));
  xhr.responseType = 'json';
  xhr.send();
};

window.showMovieDetail = function(item, map) {
  displayLoadingPanel(item.title);
  getMoveDetail(item.title, item.director);
  plotLocations(item, map);
};