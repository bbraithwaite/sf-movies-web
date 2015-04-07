'use strict';

(function (window, document) {

  window.movieApp = window.movieApp || {};
  
  var templates = {};
  
  templates.mapCanvas = function mapCanvasTemplate() {
    return document.getElementById('map-canvas');
  };

  templates.home = function homeTemplate() {
    var homeControlDiv = document.createElement('div');
    homeControlDiv.id = 'bottom_panel';
    homeControlDiv.className = 'bottom_panel';

    var dashBoard = document.createElement('div');
    dashBoard.id = 'dashboard';
    dashBoard.className = 'dashboard';

    var buf = [];
    buf.push('<h2>SF Movies</h2><div>See film locations for all movies filmed in San Fransisco. <strong>Click on a marker to see more information about a location.</strong>.</div>');
    buf.push('<p>This is a sample project from <a href="http://www.bradoncode.com">Bradley Braithwaite</a>.</p>');
    dashBoard.innerHTML = buf.join('');

    homeControlDiv.appendChild(dashBoard);

    return homeControlDiv;
  };

  templates.location = function locationTemplate(location) {
    var locationDiv = document.getElementById('location_detail');
    var sateliteViewButton; 
    var streetViewButton;
    var backToFilmButton;

    if (!locationDiv) {
      locationDiv = document.createElement('div');
      locationDiv.id = 'location_detail';
      locationDiv.className = 'location_detail';
    
      sateliteViewButton = document.createElement('input');
      sateliteViewButton.id = 'satbtn';
      sateliteViewButton.type = 'button';
      sateliteViewButton.value = 'Satelite View';

      streetViewButton = document.createElement('input');
      streetViewButton.id = 'strbtn';
      streetViewButton.type = 'button';
      streetViewButton.value = 'Street View';

      backToFilmButton = document.createElement('input');
      backToFilmButton.id = 'bkbtn';
      backToFilmButton.type = 'button';
      backToFilmButton.value = 'Back to Film';
    } else {
      sateliteViewButton = document.getElementById('satbtn'); 
      streetViewButton = document.getElementById('strbtn');
      backToFilmButton = document.getElementById('bkbtn');
    }

    var buf = [];
    buf.push('<h2>');
    buf.push(location.location);
    buf.push('</h2><img src="https://maps.googleapis.com/maps/api/streetview?size=120x120&location=');
    buf.push(location.geo.lat);
    buf.push(',');
    buf.push(location.geo.lng);
    buf.push('" align="right">');

    locationDiv.innerHTML = buf.join('');

    return {
      container: locationDiv,
      sateliteViewButton: sateliteViewButton,
      streetViewButton: streetViewButton,
      backToFilmButton: backToFilmButton
    };
  };

  templates.loading = function loadingTemplate(response) {
    var controlText = document.getElementById('film_detail');
    
    if (!controlText) {
      controlText = document.createElement('div');
      controlText.id = 'film_detail';
      controlText.className = 'film_detail';
    }

    var buf = [];
    buf.push('<h2>');
    buf.push(response);
    buf.push('</h2><br><em>Loading locations and content...</em>');
    controlText.innerHTML = buf.join('');

    return controlText;
  };

  templates.movie = function movieTemplate(detail) {
    var buf = [];
    buf.push('<img src="');
    buf.push(detail.poster);
    buf.push('" alt="poster" align="right" width="80" height="119" style="padding-left:5px;" />');
    buf.push('<div id="plot" style="overflow: scroll; height:135px;margin-top:5px;">');
    buf.push('<h2>'); 
    buf.push(detail.title);
    buf.push('</h2>');
    buf.push(detail.releaseYear);
    buf.push('</em>, Director: ');
    buf.push('<em>');
    buf.push(detail.director);
    buf.push('</em><br><br>');
    buf.push('Staring: ');
    buf.push(detail.actors);
    buf.push('<br><br>');
    buf.push('Rating: ');
    buf.push(detail.rating);
    buf.push('<br><br>');
    buf.push('Genre: ');
    buf.push(detail.genre);
    buf.push('<br><br>');
    buf.push('<br>Plot: ');
    buf.push(detail.plot);
    buf.push('<br><br></div>');
    return buf.join('');
  };

  templates.search = function() {
    var div = window.document.createElement('div');
    div.className = 'top';
    div.id = 'top';

    var searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.name = 'q';
    searchInput.id = 'q';
    searchInput.placeholder = 'Enter film title...';

    div.appendChild(searchInput);

    return {
      container: div,
      searchInput: searchInput
    };
  };

  window.movieApp.templates = templates;

})(window, document);